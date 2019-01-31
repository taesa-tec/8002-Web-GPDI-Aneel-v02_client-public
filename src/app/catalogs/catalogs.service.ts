import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class CatalogsService {

    constructor(private http: HttpClient) { }

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
