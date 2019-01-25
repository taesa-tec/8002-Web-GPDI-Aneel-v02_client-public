import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { LoginRequest } from '@app/models';
import { LoginResponse } from '@app/models';
import { Router } from '@angular/router';

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

    login(loginRequest: LoginRequest, remember: boolean = false): Observable<LoginResponse> {
        return new Observable<LoginResponse>(rootObserver => {

            const self = this;
            const o = this.http.post<LoginResponse>(`Login`, loginRequest);

            o.subscribe({
                next(loginResponse) {
                    if (loginResponse.authenticated) {
                        self.loginResponse = loginResponse;
                        if (remember) {
                            localStorage.setItem(storageKey, JSON.stringify(loginResponse));
                        }
                    }
                    rootObserver.next(loginResponse);
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
