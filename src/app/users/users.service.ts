import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUserRequest, ResultadoResponse, User, UserProjeto, ProjetoAccesses, Permissao, Projeto } from '@app/models';
import { Observable, Subject, of, zip, BehaviorSubject } from 'rxjs';
import { share, delay } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    protected _currentUser: User;
    protected currentUserUpdatedSource = new BehaviorSubject<User>(null);
    protected usersAccesses = new Map<string, Observable<any>>();
    currentUserUpdated = this.currentUserUpdatedSource.asObservable();
    projetoAccesses = ProjetoAccesses;

    constructor(protected http: HttpClient, protected auth: AuthService, protected catalogo: CatalogsService) { }

    get currentUser() {
        return this._currentUser;
    }
    set currentUser(value) {
        this._currentUser = value;
        this.currentUserUpdatedSource.next(this.currentUser);
    }

    me(forceUpdate: boolean = false) {

        return new Observable<User>(subscriber => {

            if (this.currentUser && !forceUpdate) {
                subscriber.next(this.currentUser);
                return;
            }

            this.http.get<User>(`Users/me`).pipe(share()).subscribe(user => {
                this.currentUser = user;
                this.currentUserUpdatedSource.next(this.currentUser);
                subscriber.next(this.currentUser);
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.logout();
                }

            });

        });
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

    userCanAccess(id: string, projeto: Projeto, permissao: Permissao = null) {
        return new Observable<boolean>(observer => {
            const projetos$ = this.usersAccesses.has(id) ? this.usersAccesses.get(id) : this.userProjetos(id);
            const permissoes$ = this.catalogo.permissoes();
            this.usersAccesses.set(id, projetos$);

            zip(projetos$, permissoes$).subscribe(([projetos, permissoes]) => {
                if (projetos.length === 0 || permissoes.length === 0) {
                    observer.next(false);
                }

                const projetoAccess = projetos.find(p => p.projetoId === projeto.id);
                if (projetoAccess) {
                    if (permissao) {
                        try {
                            const userp = this.projetoAccesses[projetoAccess.catalogUserPermissao.valor];
                            const checkp = this.projetoAccesses[permissao.valor];


                            observer.next((userp & checkp) > 0);
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

    currentUserCanAccess(projeto: Projeto, permissao: Permissao = null) {
        if (this.currentUser) {
            return this.userCanAccess(this.currentUser.id, projeto, permissao);
        }
        return of(false);

    }
}
