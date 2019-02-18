import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Routes, Route, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import filter from "lodash-es/filter";
import { Projeto, ProjetoStatus } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

import { projetoPlanejamentoRoutes, projetoRoutes, projetoIniciadoRoutes } from '@app/projetos/projeto-routings';
import { AppService } from '@app/app.service';


@Component({
    selector: 'app-projeto',
    templateUrl: './projeto.component.html',
    styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

    @ViewChildren(LoadingComponent) sidebarsLoading !: QueryList<LoadingComponent>;
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    projetoPlanejamentoRoutes: Routes;
    projetoIniciadoRoutes: Routes;
    projetoRotas = projetoRoutes;
    projeto: Projeto;

    menu = {
        proposta: [
            { text: "Projeto", icon: "ta-projeto", path: 'proposta/info' },
            { text: "Temas", icon: "ta-chat", path: 'proposta/temas' },
            { text: "Produtos", icon: "ta-box", path: 'proposta/produtos' },
            { text: "Etapas", icon: "ta-etapas", path: 'proposta/etapas' },
            { text: "Empresas", icon: "ta-empresas", path: 'proposta/empresas' },
            { text: "Recursos Humanos", icon: "ta-group", path: 'proposta/recursos-humanos' },
            { text: "Alocação de recursos", icon: "ta-alocacao-rh", path: 'proposta/alocaco-recursos-humanos' },
            { text: "Recursos Materiais", icon: "ta-recurso-material", path: 'proposta/recursos-materias' },
            { text: "Alocação de recursos Materias", icon: "ta-alocacao-material", path: 'proposta/alocaco-recursos-materiais' },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'proposta/extrato-financeiro-empresas' },
            { text: "Extrato Financeiro Etapas", icon: "ta-table", path: 'proposta/extrato-financeiro-etapas' }
        ],
        iniciado: [
            { text: "Inserir Registro REFP", icon: "ta-edit", path: 'iniciado/refp-inserir' },
            { text: "Registros Pendentes REFP", icon: "ta-ampulheta", path: 'iniciado/refp/pendentes' },
            { text: "Registros Reprovados REFP", icon: "ta-cancel-circle", path: 'iniciado/refp/reprovados' },
            { text: "Registros Aprovados REFP", icon: "ta-ok", path: 'iniciado/refp/aprovados' },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'iniciado/refp-extrato' },
            { text: "Alterar Projeto", icon: "ta-warning", path: 'iniciado/alterar' },
            { text: "Consultar Dados Planejamento Projeto", icon: "ta-eye", path: 'iniciado/consultar' },
        ],
        finalizado: [
            { text: "Em desenvolvimento", icon: "ta-warning", path: "" }
        ]
    };


    constructor(private route: ActivatedRoute, protected app: AppService) {

    }

    get routes() {
        switch (this.projeto.catalogStatus.status) {
            case 'proposta':
            case 'Proposta':
                return { prefix: 'proposta', routes: this.menu.proposta };
            case 'iniciado':
            case 'Iniciado':
                return { prefix: 'iniciado', routes: this.menu.iniciado };
            default:
                return {
                    prefix: '', routes: []
                };
        }
    }


    ngOnInit() {
        this.route.data.subscribe((data: { projeto: Projeto }) => {
            this.projeto = data.projeto;
        });
    }

}
