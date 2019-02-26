import { Routes } from '@angular/router';
import { ProjetoResolverService } from './projeto-resolver.service';

// Logs
import { LogProjetoComponent } from '@app/projetos/projeto/log-projeto/log-projeto.component';

// Central Administrativa
import { CentralAdministrativaComponent } from '@app/projetos/projeto/central-administrativa/central-administrativa.component';
import { GeracaoXmlComponent } from '@app/projetos/projeto/central-administrativa/geracao-xml/geracao-xml.component';
import { LogsDutoComponent } from '@app/projetos/projeto/central-administrativa/logs-duto/logs-duto.component';
import { RepositorioXmlComponent } from '@app/projetos/projeto/central-administrativa/repositorio-xml/repositorio-xml.component';
import { AlterarStatusComponent } from '@app/projetos/projeto/central-administrativa/alterar-status/alterar-status.component';
import { UsuariosComponent } from '@app/projetos/projeto/central-administrativa/usuarios/usuarios.component';

// Common
import { RecursosHumanosComponent } from '@app/projetos/projeto/common/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/common/recursos-materiais/recursos-materiais.component';


// Proposta
import { InfoComponent } from '@app/projetos/projeto/proposta/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/proposta/temas/temas.component';
import { ProdutosComponent } from '@app/projetos/projeto/proposta/produtos/produtos.component';
import { EtapasComponent } from '@app/projetos/projeto/proposta/etapas/etapas.component';
import { EmpresasComponent } from '@app/projetos/projeto/proposta/empresas/empresas.component';
import { AlocacaoComponent as AlocacaoHComponent } from '@app/projetos/projeto/proposta/recursos-humanos/alocacao.component';
import { AlocacaoComponent as AlocacaoMComponent } from '@app/projetos/projeto/proposta/recursos-materiais/alocacao.component';
import { ExtratoFinanceiroEmpresasComponent } from '@app/projetos/projeto/proposta/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from '@app/projetos/projeto/proposta/extrato-financeiro-etapas/extrato-financeiro-etapas.component';

// Iniciado
import { RefpInserirComponent } from './projeto/iniciado/refp-inserir/refp-inserir.component';
import { RefpListComponent } from './projeto/iniciado/refp-list/refp-list.component';
import { RefpExtratoComponent } from './projeto/iniciado/refp-extrato/refp-extrato.component';
import { AlterarProjetoComponent } from './projeto/iniciado/alterar-projeto/alterar-projeto.component';
import { ConsultarDadosComponent } from './projeto/iniciado/consultar-dados/consultar-dados.component';
import { RecursoHumanoComponent as REFP_RH_Component } from './projeto/iniciado/refp-inserir/recurso-humano.component';
import { RecursoMaterialComponent as REFP_RC_Component } from './projeto/iniciado/refp-inserir/recurso-material.component';
import { ProrrogarComponent } from './projeto/iniciado/prorrogar/prorrogar.component';

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
    },
    { path: 'logs', component: LogProjetoComponent, data: { text: "Log Projeto", icon: "ta-log" } }
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
        children: [
            { path: '', redirectTo: 'recurso-humano', pathMatch: 'full' },
            { path: 'recurso-material', component: REFP_RC_Component },
            { path: 'recurso-humano', component: REFP_RH_Component }
        ]
    },
    {
        path: 'refp-extrato', component: RefpExtratoComponent,
    },
    {
        path: 'refp/:status', component: RefpListComponent
    },
    {
        path: 'alterar', component: AlterarProjetoComponent,
        children: [
            { path: '', redirectTo: 'prorrogar', pathMatch: 'full' },
            { path: 'prorrogar', component: ProrrogarComponent },
            { path: 'recursos-humanos', component: RecursosHumanosComponent },
            { path: 'recursos-materiais', component: RecursosMateriaisComponent }

        ]
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
