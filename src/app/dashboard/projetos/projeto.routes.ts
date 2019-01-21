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
import { ExtratoFinanceiroEmpresasComponent } from './extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from './extrato-financeiro-etapas/extrato-financeiro-etapas.component';
import { CentralAdministrativaComponent } from './central-administrativa/central-administrativa.component';
import { GeracaoXmlComponent } from './central-administrativa/geracao-xml/geracao-xml.component';
import { LogsDutoComponent } from './central-administrativa/logs-duto/logs-duto.component';
import { RepositorioXmlComponent } from './central-administrativa/repositorio-xml/repositorio-xml.component';
import { AlterarStatusComponent } from './central-administrativa/alterar-status/alterar-status.component';
import { UsuariosComponent } from './central-administrativa/usuarios/usuarios.component';
import { LogProjetoComponent } from './log-projeto/log-projeto.component';

export const centralPlanejamentoRoutes: Routes = [{
    path: "",
    redirectTo: "geracao-xml",
    pathMatch: "full"
},
{
    path: "geracao-xml", component: GeracaoXmlComponent,
    data: { text: 'Geração XMLS' }
},
{
    path: "logs-duto", component: LogsDutoComponent,
    data: { text: 'Logs DUTO' }
},
{
    path: "repositorio-xml", component: RepositorioXmlComponent,
    data: { text: 'Repositório XMLs Gerados' }
},
{
    path: "alteracao-status-projeto", component: AlterarStatusComponent,
    data: { text: 'Alteração Status Projeto' }
},
{
    path: "usuarios", component: UsuariosComponent,
    data: { text: 'Usuários' }
}];

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
        path: 'extrato-financeiro-empresas', component: ExtratoFinanceiroEmpresasComponent,
        data: { text: "Extrato Financeiro Empresas", icon: "ta-extrato" }
    },
    {
        path: 'extrato-financeiro-etapas', component: ExtratoFinanceiroEtapasComponent,
        data: { text: "Extrato Financeiro Etapas", icon: "ta-table" }
    },
    {
        path: 'central-administrativa',
        component: CentralAdministrativaComponent,
        data: { text: "Central Adminstrativa", icon: "ta-central-admin", routes: centralPlanejamentoRoutes },
        children: centralPlanejamentoRoutes
    },
    { path: 'logs', component: LogProjetoComponent, data: { text: "Log Projeto", icon: "ta-log" } },
    { path: '**', redirectTo: 'info', pathMatch: 'full' }
];
