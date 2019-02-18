import { Routes } from '@angular/router';

import { InfoComponent } from '@app/projetos/projeto/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/temas/temas.component';
import { ProdutosComponent } from '@app/projetos/projeto/produtos/produtos.component';
import { EtapasComponent } from '@app/projetos/projeto/etapas/etapas.component';
import { EmpresasComponent } from '@app/projetos/projeto/empresas/empresas.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/recursos-materiais/recursos-materiais.component';
import { AlocacaoComponent as AlocacaoHComponent } from '@app/projetos/projeto/recursos-humanos/alocacao.component';
import { AlocacaoComponent as AlocacaoMComponent } from '@app/projetos/projeto/recursos-materiais/alocacao.component';
import { ExtratoFinanceiroEmpresasComponent } from '@app/projetos/projeto/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from '@app/projetos/projeto/extrato-financeiro-etapas/extrato-financeiro-etapas.component';
import { CentralAdministrativaComponent } from '@app/projetos/projeto/central-administrativa/central-administrativa.component';
import { GeracaoXmlComponent } from '@app/projetos/projeto/central-administrativa/geracao-xml/geracao-xml.component';
import { LogsDutoComponent } from '@app/projetos/projeto/central-administrativa/logs-duto/logs-duto.component';
import { RepositorioXmlComponent } from '@app/projetos/projeto/central-administrativa/repositorio-xml/repositorio-xml.component';
import { AlterarStatusComponent } from '@app/projetos/projeto/central-administrativa/alterar-status/alterar-status.component';
import { UsuariosComponent } from '@app/projetos/projeto/central-administrativa/usuarios/usuarios.component';
import { LogProjetoComponent } from '@app/projetos/projeto/log-projeto/log-projeto.component';
import { ProjetoResolverService } from './projeto-resolver.service';
import { RefpInserirComponent } from './projeto/iniciado/refp-inserir/refp-inserir.component';
import { RefpListComponent } from './projeto/iniciado/refp-list/refp-list.component';
import { RefpExtratoComponent } from './projeto/iniciado/refp-extrato/refp-extrato.component';
import { AlterarProjetoComponent } from './projeto/iniciado/alterar-projeto/alterar-projeto.component';
import { ConsultarDadosComponent } from './projeto/iniciado/consultar-dados/consultar-dados.component';

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

export const projetoCommonsRoutes: Routes = [
    {
        path: 'central-administrativa',
        component: CentralAdministrativaComponent,
        data: { text: "Central Adminstrativa", icon: "ta-central-admin", routes: centralPlanejamentoRoutes },
        children: centralPlanejamentoRoutes,
        resolve: {
            // projeto: ProjetoResolverService
        }
    }, { path: 'logs', component: LogProjetoComponent, data: { text: "Log Projeto", icon: "ta-log" } }
];

export const projetoPlanejamentoRoutes: Routes = [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    {
        path: 'info', component: InfoComponent,
    },
    {
        path: 'temas', component: TemasComponent,
    },
    {
        path: 'produtos', component: ProdutosComponent,
    },
    {
        path: 'etapas', component: EtapasComponent,
    },
    {
        path: 'empresas', component: EmpresasComponent,
    },
    {
        path: 'recursos-humanos', component: RecursosHumanosComponent,
    },
    {
        path: 'alocacao-recursos-humanos', component: AlocacaoHComponent,
    },
    {
        path: 'recursos-materiais', component: RecursosMateriaisComponent,
    },
    {
        path: 'alocacao-recursos-materiais', component: AlocacaoMComponent,
    },
    {
        path: 'extrato-financeiro-empresas', component: ExtratoFinanceiroEmpresasComponent,
    },
    {
        path: 'extrato-financeiro-etapas', component: ExtratoFinanceiroEtapasComponent,
    },
    { path: '**', redirectTo: 'info', pathMatch: 'full' }
];

export const projetoIniciadoRoutes: Routes = [
    {
        path: '', redirectTo: "refp-inserir", pathMatch: 'full'
    },
    {
        path: 'refp', redirectTo: "refp-inserir", pathMatch: 'full'
    },
    {
        path: 'refp-inserir', component: RefpInserirComponent,
    },
    {
        path: 'refp-extrato', component: RefpExtratoComponent,
    },
    {
        path: 'refp/:status', component: RefpListComponent,
    },
    {
        path: 'alterar', component: AlterarProjetoComponent,
    },
    {
        path: 'consultar', component: ConsultarDadosComponent,
    },
];

export const projetoRoutes: Routes = [].concat([
    {
        path: "proposta",
        children: projetoPlanejamentoRoutes,
        resolve: {
            projeto: ProjetoResolverService
        }
    },
    {
        path: "iniciado",
        children: projetoIniciadoRoutes,
        resolve: {
            projeto: ProjetoResolverService
        }
    },
    {
        path: "finalizado",
        children: projetoIniciadoRoutes,
        resolve: {
            projeto: ProjetoResolverService
        }
    },
]).concat(projetoCommonsRoutes);
