import { Component, OnInit } from '@angular/core';

import { projetoPlanejamentoRoutes } from '../projeto.routes';
import { Routes, Route, ActivatedRoute } from '@angular/router';
import filter from "lodash-es/filter";
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjetoService } from '../projeto.service';
import { Projeto, Status } from '@app/shared/projeto.model';



@Component({
    selector: 'app-projeto',
    templateUrl: './projeto.component.html',
    styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

    projetoPlanejamentoRoutes: Routes;
    currentProjeto: Projeto;

    constructor(private route: ActivatedRoute, private projetoService: ProjetoService, private spinner: NgxSpinnerService) {
        this.projetoPlanejamentoRoutes = filter(projetoPlanejamentoRoutes, (r => r.path !== "**" && r.path.length > 0));
    }
    get routes() {
        return this.projetoPlanejamentoRoutes;
    }

    get status() {
        switch (this.currentProjeto.status) {
            case Status.Proposta:
                return "Proposta";
            case Status.Iniciado:
                return "Iniciado";
            case Status.Encerrado:
                return "Encerrado";
            default:
                return "Desconhecido";
        }
    }

    getProjeto() {
        const id = +this.route.snapshot.paramMap.get('id');
        const self = this;
        this.spinner.show();
        this.projetoService.getById(id).subscribe({
            next(projeto) {
                self.currentProjeto = projeto;
                console.log(projeto);
                setTimeout(() => {
                    self.spinner.hide();
                }, 1000);
            },
            error() {
                // @todo Exibir alguma mensagem de erro
                self.spinner.hide();
                setTimeout(() => {
                    self.spinner.hide();
                }, 1000);
            }
        });

    }
    ngOnInit() {
        this.getProjeto();
    }

}
