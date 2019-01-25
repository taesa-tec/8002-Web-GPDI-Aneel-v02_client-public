import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { CreateProjectRequest, Projeto } from './models';

@Injectable({
    providedIn: 'root'
})
export class ProjetosService {


    constructor(private http: HttpClient) { }

    meusProjetos() {
        return this.http.get<Array<any>>('UserProjetos/me');
    }


    criarProjeto(projeto: CreateProjectRequest) {
        return this.http.post('Projetos', projeto);
    }

    getById(id: number) {
        return this.http.get<Projeto>(`Projetos/${id}`);
    }

}
