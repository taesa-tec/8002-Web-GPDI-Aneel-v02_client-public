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

    menus: { [propName: string]: Array<{ text: string, icon: string, path: string }> } = {
        proposta: [
            { text: "Projeto", icon: "ta-projeto", path: 'info' },
            { text: "Temas", icon: "ta-chat", path: 'temas' },
            { text: "Produtos", icon: "ta-box", path: 'produtos' },
            { text: "Etapas", icon: "ta-etapas", path: 'etapas' },
            { text: "Empresas", icon: "ta-empresas", path: 'empresas' },
            { text: "Recursos Humanos", icon: "ta-group", path: 'recursos-humanos' },
            { text: "Alocação de recursos Humanos", icon: "ta-alocacao-rh", path: 'alocacao-recursos-humanos' },
            { text: "Recursos Materiais", icon: "ta-recurso-material", path: 'recursos-materiais' },
            { text: "Alocação de recursos Materias", icon: "ta-alocacao-material", path: 'alocacao-recursos-materiais' },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'extrato-financeiro-empresas' },
            { text: "Extrato Financeiro Etapas", icon: "ta-table", path: 'extrato-financeiro-etapas' }
        ],
        iniciado: [
            { text: "Inserir Registro REFP", icon: "ta-edit", path: 'refp-inserir' },
            { text: "Registros Pendentes REFP", icon: "ta-ampulheta", path: 'refp/pendentes' },
            { text: "Registros Reprovados REFP", icon: "ta-cancel-circle", path: 'refp/reprovados' },
            { text: "Registros Aprovados REFP", icon: "ta-ok", path: 'refp/aprovados' },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'extrato-financeiro' },
            { text: "Alterar Projeto", icon: "ta-warning", path: 'alterar' },
            { text: "Consultar Dados Planejamento Projeto", icon: "ta-eye", path: 'consultar' },
        ],
        finalizado: [
            { text: "Relatório Final e Auditoria", icon: "ta-edit", path: "" },
            { text: "Relatório Etapas Projeto", icon: "ta-etapas", path: "" },
            { text: "Resultados Capacitação", icon: "ta-user-id", path: "" },
            { text: "Resultados Apoio a Infra-estrutura", icon: "ta-tubo-ensaio", path: "" },
            { text: "Resultados Produção Técnico Cientifica", icon: "ta-torre", path: "" },
            { text: "Resultados Propriedade Intelectual", icon: "ta-lamp", path: "" },
            { text: "Resultados Socioambientais", icon: "ta-ambiente", path: "" },
            { text: "Resultados Indicadores Econômicos", icon: "ta-chart", path: "" },
        ]
    };

    menu: Array<{ text: string, icon: string, path: string }>;


    get pstatus() {
        return this.projeto.catalogStatus.status.toLocaleLowerCase();
    }
    constructor(private route: ActivatedRoute, protected app: AppService) { }

    route2link(r: { text: string, icon: string, path: string }) {
        return ['/dashboard', 'projeto', this.projeto.id, this.pstatus].concat(r.path.split('/'));
    }

    ngOnInit() {
        this.route.data.subscribe((data: { projeto: Projeto }) => {
            this.projeto = data.projeto;
            this.setMenu();
            this.app.projetos.projetoUpdated.subscribe(projeto => {
                this.setMenu();
            });
        });
    }
    setMenu() {
        switch (this.projeto.catalogStatus.status.toLocaleLowerCase()) {
            case 'proposta':
                this.menu = this.menus.proposta;
                break;
            case 'iniciado':
                this.menu = this.menus.iniciado;
                break;
        }
    }

}
