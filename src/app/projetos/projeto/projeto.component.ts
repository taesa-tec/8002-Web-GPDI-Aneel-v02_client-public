import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Routes, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import filter from "lodash-es/filter";
import { Projeto, ProjetoStatus } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

import { projetoPlanejamentoRoutes } from '@app/projetos/projeto-routings';
import { ProjetosService } from '@app/projetos/projetos.service';
import { AppService } from '@app/app.service';


@Component({
    selector: 'app-projeto',
    templateUrl: './projeto.component.html',
    styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

    @ViewChildren(LoadingComponent) sidebarsLoading !: QueryList<LoadingComponent>;

    projetoPlanejamentoRoutes: Routes;
    projeto: Projeto;


    constructor(private route: ActivatedRoute, protected app: AppService) {
        this.projetoPlanejamentoRoutes = filter(projetoPlanejamentoRoutes, (r => r.path !== "**" && r.path.length > 0));
    }

    get routes() {
        return this.projetoPlanejamentoRoutes;
    }


    ngOnInit() {
        this.route.data.subscribe((data: { projeto: Projeto }) => this.projeto = data.projeto);
    }

}
