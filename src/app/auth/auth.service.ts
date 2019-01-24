import { Injectable, Inject } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { LoginRequest } from '@app/commons/requests';
import { LoginResponse } from '@app/commons/responses';
import { Router } from '@angular/router';

// @todo Armazenar o token do usuário se estiver marcado como lembrar-me

const storageKey = 'loggedUser';
@Injectable({
    providedIn: 'root'
})
export class AuthService {


    private api: string;
    private loginResponse: LoginResponse;

    constructor(private http: HttpClient, @Inject(APP_CONFIG) config: AppConfig, protected router: Router) {
        this.api = config.api_url;

        const loggedUser = localStorage.getItem(storageKey);
        if (loggedUser) {
            try {
                this.loginResponse = JSON.parse(loggedUser);
            } catch (e) {
                console.log(e.message);

            }
        }
    }


    get expiration() {
        if (this.loginResponse && this.loginResponse.expiration) {
            return new Date(this.loginResponse.expiration);
        }
        return null;
    }


    get token() {
        if (this.loginResponse && this.loginResponse.authenticated) {
            return this.loginResponse.accessToken;
        }
        return false;
    }

    get isLoggedIn() {
        if (this.token && this.expiration !== null && this.expiration.getTime() > Date.now()) {
            return true;
        }

        return false;
    }

    login(loginRequest: LoginRequest, remember: boolean = false) {
        return new Observable<Boolean>(rootObserver => {

            const self = this;
            const o = this.http.post<LoginResponse>(`${this.api}/api/Login`, loginRequest);

            o.subscribe({
                next(loginResponse) {
                    if (loginResponse.authenticated) {
                        self.loginResponse = loginResponse;
                        if (remember) {
                            localStorage.setItem(storageKey, JSON.stringify(loginResponse));
                        }
                        rootObserver.next(true);
                    } else {
                        rootObserver.next(false);

                    }
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

    logout(): void {
        this.loginResponse = null;
        localStorage.removeItem(storageKey);
        this.router.navigate(['/login']);
    }


}
