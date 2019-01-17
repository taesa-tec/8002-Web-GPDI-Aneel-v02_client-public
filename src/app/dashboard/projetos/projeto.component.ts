import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Routes, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import filter from "lodash-es/filter";
import { ProjetoService } from '@app/projetos/projeto.service';
import { Projeto, ProjetoStatus } from '@app/projetos/common';
import { LoadingComponent } from '@app/shared/loading/loading.component';

import { projetoPlanejamentoRoutes } from '@app/dashboard/projetos/projeto.routes';



@Component({
    selector: 'app-projeto',
    templateUrl: './projeto.component.html',
    styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit, AfterViewInit {

    @ViewChildren(LoadingComponent) sidebarsLoading !: QueryList<LoadingComponent>;

    projetoPlanejamentoRoutes: Routes;
    currentProjeto: Projeto;


    constructor(private route: ActivatedRoute, private projetoService: ProjetoService) {
        this.projetoPlanejamentoRoutes = filter(projetoPlanejamentoRoutes, (r => r.path !== "**" && r.path.length > 0));
    }
    get routes() {
        return this.projetoPlanejamentoRoutes;
    }

    get status() {
        switch (this.currentProjeto.status) {
            case ProjetoStatus.Proposta:
                return "Proposta";
            case ProjetoStatus.Iniciado:
                return "Iniciado";
            case ProjetoStatus.Encerrado:
                return "Encerrado";
            default:
                return "Desconhecido";
        }
    }

    getProjeto() {
        const id = +this.route.snapshot.paramMap.get('id');
        const self = this;
        return new Observable(observer => {

            this.projetoService.getById(id).subscribe({
                next(projeto) {
                    self.currentProjeto = projeto;
                    observer.next();
                },
                error() {
                    observer.error();
                }
            });
        });


    }
    ngOnInit() {


    }
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.sidebarsLoading) {
                this.sidebarsLoading.forEach(l => l.show());
            }
            this.getProjeto().subscribe(() => {
                this.sidebarsLoading.forEach(l => l.hide());
            });
        }, 0);
    }

}
