import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Projeto, Resultado } from '@app/projetos/common';
import { projetos as projetosMockup } from "@mockup/projetos";

@Injectable({
    providedIn: 'root'
})
export class ProjetoService {

    constructor() { }

    getById(id: number): Observable<Projeto> {
        return new Observable<Projeto>(rootObserver => {
            setTimeout(() => {
                if (projetosMockup[id - 1]) {
                    rootObserver.next(projetosMockup[id - 1]);
                } else {
                    rootObserver.error();
                }
                rootObserver.complete();
            }, 350);

        });

    }

    getProjetos(): Observable<Projeto[]> {
        const projetos: Projeto[] = projetosMockup;

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
