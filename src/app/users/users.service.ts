import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUser, CreateUserRequest, ResultadoResponse, User } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private api: string;

    constructor(private http: HttpClient) { }

    me() {
        return this.http.get<CurrentUser>(`Users/me`);
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
}
