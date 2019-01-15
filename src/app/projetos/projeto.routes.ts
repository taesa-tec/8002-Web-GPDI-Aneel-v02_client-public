import { Routes } from '@angular/router';

import { InfoComponent } from '@app/projetos/projeto/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/temas/temas.component';
import { ProdutosComponent } from '@app/projetos/projeto/produtos/produtos.component';
import { EtapasComponent } from '@app/projetos/projeto/etapas/etapas.component';
import { EmpresasComponent } from '@app/projetos/projeto/empresas/empresas.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/recursos-humanos/recursos-humanos.component';
import { AlocacaoRecursosHumanosComponent } from '@app/projetos/projeto/alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/recursos-materiais/recursos-materiais.component';
import { ExtratoFinanceiroEmpresaComponent } from '@app/projetos/projeto/extrato-financeiro-empresa/extrato-financeiro-empresa.component';
import { ExtratoFinanceiroEtapasComponent } from '@app/projetos/projeto/extrato-financeiro-etapas/extrato-financeiro-etapas.component';
import { CentralAdministrativaComponent } from '@app/projetos/projeto/central-administrativa/central-administrativa.component';
import { LogComponent } from '@app/projetos/projeto/log/log.component';

export const projetoPlanejamentoRoutes: Routes = [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    { path: 'info', component: InfoComponent, data: { text: "Projeto", icon: "ta-projeto" } },
    { path: 'temas', component: TemasComponent, data: { text: "Temas", icon: "ta-chat" } },
    { path: 'produtos', component: ProdutosComponent, data: { text: "Produtos", icon: "ta-box" } },
    { path: 'etapas', component: EtapasComponent, data: { text: "Etapas", icon: "ta-etapas" } },
    { path: 'empresas', component: EmpresasComponent, data: { text: "Empresas", icon: "ta-empresas" } },
    { path: 'recursos-humanos', component: RecursosHumanosComponent, data: { text: "Recursos Humanos", icon: "ta-group" } },
    {
        path: 'alocacao-recursos-humanos', component: AlocacaoRecursosHumanosComponent,
        data: { text: "Alocação de recursos", icon: "ta-alocacao-rh" }
    },
    {
        path: 'recursos-materiais', component: RecursosMateriaisComponent,
        data: { text: "Recursos Materiais", icon: "ta-recurso-material" }
    },
    {
        path: 'alocacao-recursos-materiais', component: AlocacaoRecursosHumanosComponent,
        data: { text: "Alocação de recursos Materias", icon: "ta-alocacao-material" }
    },
    {
        path: 'extrato-financeiro-empresas', component: ExtratoFinanceiroEmpresaComponent,
        data: { text: "Extrato Financeiro Empresas", icon: "ta-extrato" }
    },
    {
        path: 'extrato-financeiro-etapas', component: ExtratoFinanceiroEtapasComponent,
        data: { text: "Extrato Financeiro Etapas", icon: "ta-table" }
    },
    {
        path: 'central-administrativa', component: CentralAdministrativaComponent,
        data: { text: "Central Adminstrativa", icon: "ta-central-admin" }
    },
    { path: 'logs', component: LogComponent, data: { text: "Log Projeto", icon: "ta-log" } },
    { path: '**', redirectTo: 'info', pathMatch: 'full' }
];
