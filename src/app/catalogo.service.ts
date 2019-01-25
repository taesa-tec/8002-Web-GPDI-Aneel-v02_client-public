import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AuthService } from './auth/auth.service';
import { Empresa } from './models';

@Injectable({
    providedIn: 'root',
})
export class CatalogoService {

    constructor(
        private http: HttpClient,
        protected auth: AuthService,
    ) { }

    permissoes() {
        return this.http.get(`catalogs/permissoes`);
    }

    empresas() {
        return this.http.get<Array<Empresa>>(`catalogs/empresas`);
    }

    status() {
        return this.http.get(`catalogs/status`);
    }

    segmentos() {
        return this.http.get(`catalogs/segmentos`);
    }

    temas() {
        return this.http.get(`catalogs/temas`);
    }

    estados() {
        return this.http.get(`catalogs/Estados`);
    }


}
