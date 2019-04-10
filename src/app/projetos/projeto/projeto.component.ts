import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Routes, ActivatedRoute, RouterOutlet } from '@angular/router';

import { LoadingComponent } from '@app/shared/loading/loading.component';

import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { filter } from 'rxjs/operators';
import { NiveisUsuarios, AppMenu } from '@app/models';


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
    projeto: ProjetoFacade;

    menus: { [propName: string]: AppMenu } = {
        proposta: [
            { text: { pg: "Projeto Gestão", pd: "Projeto" }, icon: "ta-projeto", path: 'info' },
            { text: "Temas", icon: "ta-chat", path: "temas", only: "PD" },
            { text: "Atividades", icon: "ta-chat", path: "atividades", only: "PG" },
            { text: "Produtos", icon: "ta-box", path: 'produtos', only: 'PD' },
            { text: "Etapas", icon: "ta-etapas", path: 'etapas' },
            { text: "Empresas", icon: "ta-empresas", path: 'empresas' },
            { text: "Recursos Humanos", icon: "ta-group", path: 'recursos-humanos' },
            { text: "Alocação de Recursos Humanos", icon: "ta-alocacao-rh", path: 'alocacao-recursos-humanos' },
            { text: "Recursos Materiais", icon: "ta-recurso-material", path: 'recursos-materiais' },
            { text: "Alocação de Recursos Materias", icon: "ta-alocacao-material", path: 'alocacao-recursos-materiais' },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'extrato-financeiro-empresas' },
            { text: "Extrato Financeiro Etapas", icon: "ta-table", path: 'extrato-financeiro-etapas', only: "PD" },
            { text: "Extrato Financeiro Atividades", icon: "ta-table", path: 'extrato-financeiro-atividades', only: "PG" }
        ],
        iniciado: [
            { text: "Inserir Registro REFP", icon: "ta-edit", path: 'refp-inserir', nivel: NiveisUsuarios.leituraEscrita },
            { text: "Registros REFS", icon: "ta-projeto", path: 'refp', nivel: NiveisUsuarios.leituraEscrita },
            { text: "Extrato Financeiro Empresas", icon: "ta-extrato", path: 'extrato-financeiro' },
            { text: "Alterar Projeto", icon: "ta-warning", path: 'alterar', nivel: NiveisUsuarios.admin },
            { text: "Consultar Dados Planejamento Projeto", icon: "ta-eye", path: 'consultar' },
        ],
        finalizado: [
            { text: { pg: "Relatório Final e Auditoria", pd: "Relatório Final Base Projeto" }, icon: "ta-edit", path: "relatorio-final-auditoria" },
            { text: { pd: "Relatório Etapas Projeto", pg: "Relatório Etapas" }, icon: "ta-etapas", path: "relatorio-etapas-projeto" },
            { text: "Relatório Atividades", icon: "ta-edit", path: "relatorio-atividades", only: "PG" },
            { text: { pd: "Resultados Capacitação", pg: "Resultados Capacitação Profissional" }, icon: "ta-user-id", path: "resultados-capacitacao" },
            { text: "Resultados Apoio a Infra-estrutura", icon: "ta-tubo-ensaio", path: "resultados-infra-estrutura", only: "PD" },
            { text: "Resultados Produção Técnico Cientifica", icon: "ta-torre", path: "resultados-cientificos" },
            { text: "Resultados Propriedade Intelectual", icon: "ta-lamp", path: "resultados-propriedade-intelectual", only: "PD" },
            { text: "Resultados Socioambientais", icon: "ta-ambiente", path: "resultados-socioambientais", only: "PD" },
            { text: "Resultados Indicadores Econômicos", icon: "ta-chart", path: "resultados-economicos", only: "PD" },
        ]
    };

    commonMenu: AppMenu = [
        { text: "Central Administrativa", icon: "ta-central-admin", path: 'central-administrativa', nivel: NiveisUsuarios.aprovador },
        { text: "Logs", icon: "ta-log", path: 'logs', nivel: NiveisUsuarios.aprovador },
    ];

    menu: AppMenu;


    get pstatus() {
        return this.projeto.catalogStatus.status.toLocaleLowerCase();
    }
    constructor(protected app: AppService) { }

    protected route2link(path: string | { pd?: string; pg?: string }, prefix = ''): Array<string> {
        if (typeof path === "string") {
            return ['/dashboard', 'projeto', this.projeto.id, prefix]
                .concat(path.split('/'))
                .map(i => String(i).trim())
                .filter(s => s.trim().length > 0);
        } else {
            const tipo = this.projeto.tipoValor.toLowerCase();
            return this.route2link(path[tipo], prefix);
        }
    }
    protected route2text(text: string | { pd?: string; pg?: string }): string {
        try {
            return typeof text === "string" ? text : text[this.projeto.tipoValor.toLowerCase()];
        } catch (error) {
            return '';
        }
    }
    protected buildMenu(menu: AppMenu): AppMenu {

        const commonMenu = this.commonMenu.map(item => {
            return {
                text: this.route2text(item.text),
                icon: this.route2text(item.icon),
                path: Array.isArray(item.path) ? item.path : this.route2link(item.path, ''),
                nivel: item.nivel || true
            };
        });
        return menu

            .filter(item => {
                return (item.only === undefined || (item.only && item.only === this.projeto.tipoValor));
            })
            .map(item => {
                return {
                    text: this.route2text(item.text),
                    icon: this.route2text(item.icon),
                    path: Array.isArray(item.path) ? item.path : this.route2link(item.path, this.pstatus),
                    nivel: item.nivel || true
                };
            })
            .concat(commonMenu);
    }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.setMenu(this.projeto.catalogStatus.status);
            this.projeto.onUpdate
                .pipe(filter(event => event.prop === 'catalogStatus'))
                .subscribe((event) => {
                    this.setMenu(event.value.status);
                });

        });
    }
    setMenu(status: string) {

        switch (status.toLocaleLowerCase()) {

            case 'iniciado':
                this.menu = this.buildMenu(this.menus.iniciado);
                break;
            case 'encerrado':
                this.menu = this.buildMenu(this.menus.finalizado);
                break;
            default:
                this.menu = this.buildMenu(this.menus.proposta);
                break;
        }
    }

}
