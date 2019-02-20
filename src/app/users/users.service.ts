import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUserRequest, ResultadoResponse, User, UserProjeto } from '@app/models';
import { Observable, Subject, of } from 'rxjs';
import { share, delay } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    protected _currentUser: User;
    protected currentUserUpdatedSource = new Subject<User>();
    currentUserUpdated = this.currentUserUpdatedSource.asObservable().pipe(share());

    constructor(private http: HttpClient, protected auth: AuthService) { }

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
}
