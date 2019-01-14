import { Injectable, Inject } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api: string;
    constructor(private http: HttpClient, @Inject(APP_CONFIG) config: AppConfig) {
        this.api = config.api_url;
    }

    protected currentUser: User;

    login(user: User) {
        return new Observable<Boolean>(rootObserver => {
            const o = new Observable(observer => {
                setTimeout(() => {
                    if (user.userID === 'user' && user.password === '123') {
                        observer.next(user);
                    } else {
                        observer.error("Usuário e/ou senha incorreto");
                    }
                    observer.complete();

                }, 1000);
            });

            o.subscribe({
                next(_user) {
                    this.currentUser = _user;
                    // @todo Armazenar o token do usuário se estiver marcado como lembrar-me
                    rootObserver.next(true);
                },
                error(e) {
                    rootObserver.error(e);
                },
                complete() {
                    rootObserver.complete();
                }
            });
        });
        // this.http.post(`${this.api}/login`, user);
    }
}
