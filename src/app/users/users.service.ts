import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUserRequest, ResultadoResponse, User, UserProjeto, NiveisUsuarios, Permissao, Projeto, Roles, UserRole } from '@app/models';
import { Observable, Subject, of, zip, BehaviorSubject } from 'rxjs';
import { share, delay, filter, tap } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    protected _currentUser: User;
    protected currentUserUpdatedSource = new BehaviorSubject<User>(null);
    protected usersAccesses = new Map<string, Array<UserProjeto>>();

    currentUserUpdated = this.currentUserUpdatedSource.asObservable();

    niveisUsuarios = NiveisUsuarios;

    constructor(protected http: HttpClient, protected auth: AuthService, protected catalogo: CatalogsService) {
        this.auth.authEvent.pipe(filter(e => e !== null)).subscribe(e => {
            if (e.type === 'logout') {
                this.currentUser = null;
            } else {
                this.me().subscribe(user => { });
            }
        });
        
        if (this.auth.isLoggedIn) {
            this.me().subscribe(user => { });
        }
    }

    get currentUser() {
        return this._currentUser;
    }
    set currentUser(value) {
        if (value && value !== this._currentUser) {
            this.currentUserUpdatedSource.next(value);
        }
        this._currentUser = value;
    }


    me() {
        return this.http.get<User>(`Users/me`).pipe(tap(user => {
            this.currentUser = user;
        }, (error: HttpErrorResponse) => {
            if (error.status === 401) {
                this.auth.logout();
            }
        }));
    }

    editMe(user: User) {
        return new Observable<ResultadoResponse>(subscriber => {
            this.http.put<ResultadoResponse>(`Users`, user).subscribe(response => {
                if (response.sucesso) {
                    const u = Object.assign(this.currentUser, user);
                    this.currentUser = u;
                }
                subscriber.next(response);
            });

        });
    }

    all() {
        return this.http.get<Array<User>>(`Users`);
    }

    byId(id: string) {
        return this.http.get<User>(`Users/${id}`);
    }

    create(user: CreateUserRequest) {
        return this.http.post<ResultadoResponse>(`Users`, user);
    }

    edit(user: User) {
        return this.http.put<ResultadoResponse>(`Users`, user);
    }

    userProjetos(id: string) {
        return this.http.get<Array<UserProjeto>>(`UserProjetos/${id}`);
    }

    criarUserProjeto(userProjetos: Array<UserProjeto>) {
        return this.http.post<ResultadoResponse>(`UserProjetos`, userProjetos);
    }
    userAvatar(id: string) {
        return this.http.get<any>(`Users/${id}/avatar`);
    }

    userCanAccess(id: string, projeto: Projeto, permissao: any = null) {
        return new Observable<boolean>(observer => {

            const projetos$ = this.usersAccesses.has(id) ? of(this.usersAccesses.get(id)) : this.userProjetos(id);

            const permissoes$ = this.catalogo.permissoes();

            zip(projetos$, permissoes$).subscribe(([projetos, permissoes]) => {

                if (projetos.length === 0 || permissoes.length === 0) {
                    observer.next(false);
                    return;
                }

                this.usersAccesses.set(id, projetos);

                // Pega o acesso do usuário no projeto
                const projetoAccess = projetos.find(p => p.projetoId === projeto.id);

                if (projetoAccess) {
                    /* 
                        Se a verificação for por uma determina permissão 
                        caso o contrário retorna que o usuário tem algum tipo de acesso ao projeto
                    */
                    if (permissao) {
                        try {
                            const userp = this.niveisUsuarios[projetoAccess.catalogUserPermissao.valor];
                            const can = (userp & permissao) === permissao;
                            observer.next(can);
                        } catch (error) {

                            observer.next(false);
                        }
                        return;
                    }

                    observer.next(true);
                } else {
                    observer.next(false);
                }
            });
        });
    }

    currentUserCanAccess(projeto: Projeto, permissao: any = null) {

        return new Observable(obsr => {
            this.currentUserUpdated
                .subscribe(user => {
                    if (user) {
                        if (user.role === UserRole.Administrador) {
                            return obsr.next(true);
                        }
                        this.userCanAccess(user.id, projeto, permissao).subscribe(can => obsr.next(can));
                    } else {
                        return obsr.next(false);
                    }
                }, error => {
                    return obsr.next(false);
                });
        });

    }
}
