import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Projeto } from '../shared/projeto.model';
import { Resultado } from '../shared/resultado.model';

@Injectable({
    providedIn: 'root'
})
export class ProjetoService {

    constructor() { }

    getProjetos(): Observable<Projeto[]> {
        const projetos: Projeto[] = [];

        return of(projetos);
    }

    store(projeto: Projeto): Observable<Resultado> {
        console.log(projeto);
        return of({
            acao: "acao",
            sucesso: true,
            inconsistencias: []
        });
    }

    update(projeto: Projeto): Observable<Resultado> {
        return of({
            acao: "acao",
            sucesso: true,
            inconsistencias: []
        });
    }

    delete(projeto: Projeto): Observable<Resultado> {
        return of({
            acao: "acao",
            sucesso: true,
            inconsistencias: []
        });
    }
}
