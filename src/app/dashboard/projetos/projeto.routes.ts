import { Routes } from '@angular/router';

import { InfoComponent } from '@app/dashboard/projetos/info/info.component';
import { TemasComponent } from '@app/dashboard/projetos/temas/temas.component';
import { BlankComponent } from '@app/dashboard/projetos/blank/blank.component';
import { ProdutosComponent } from '@app/dashboard/projetos/produtos/produtos.component';
import { EtapasComponent } from './etapas/etapas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from './recursos-materiais/recursos-materiais.component';
import { AlocacaoComponent as AlocacaoHComponent } from './recursos-humanos/alocacao.component';
import { AlocacaoComponent as AlocacaoMComponent } from './recursos-materiais/alocacao.component';

export const projetoPlanejamentoRoutes: Routes = [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    {
        path: 'info', component: InfoComponent,
        data: { text: "Projeto", icon: "ta-projeto" }
    },
    {
        path: 'temas', component: TemasComponent,
        data: { text: "Temas", icon: "ta-chat" }
    },
    {
        path: 'produtos', component: ProdutosComponent,
        data: { text: "Produtos", icon: "ta-box" }
    },
    {
        path: 'etapas', component: EtapasComponent,
        data: { text: "Etapas", icon: "ta-etapas" }
    },
    {
        path: 'empresas', component: EmpresasComponent,
        data: { text: "Empresas", icon: "ta-empresas" }
    },
    {
        path: 'recursos-humanos', component: RecursosHumanosComponent,
        data: { text: "Recursos Humanos", icon: "ta-group" }
    },
    {
        path: 'alocacao-recursos-humanos', component: AlocacaoHComponent,
        data: { text: "Alocação de recursos", icon: "ta-alocacao-rh" }
    },
    {
        path: 'recursos-materiais', component: RecursosMateriaisComponent,
        data: { text: "Recursos Materiais", icon: "ta-recurso-material" }
    },
    {
        path: 'alocacao-recursos-materiais', component: AlocacaoMComponent,
        data: { text: "Alocação de recursos Materias", icon: "ta-alocacao-material" }
    },
    {
        path: 'extrato-financeiro-empresas', component: BlankComponent,
        data: { text: "Extrato Financeiro Empresas", icon: "ta-extrato" }
    },
    {
        path: 'extrato-financeiro-etapas', component: BlankComponent,
        data: { text: "Extrato Financeiro Etapas", icon: "ta-table" }
    },
    {
        path: 'central-administrativa', component: BlankComponent,
        data: { text: "Central Adminstrativa", icon: "ta-central-admin" }
    },
    { path: 'logs', component: BlankComponent, data: { text: "Log Projeto", icon: "ta-log" } },
    { path: '**', redirectTo: 'info', pathMatch: 'full' }
];
