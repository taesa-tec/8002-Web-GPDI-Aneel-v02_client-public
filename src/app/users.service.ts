import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private api: string;

    constructor(private http: HttpClient, protected auth: AuthService, ) { }

    me() {
        return this.http.get<CurrentUser>(`Users/me`, {
            headers: {
                "Authorization": `Bearer ${this.auth.token}`
            }
        });
    }
}
