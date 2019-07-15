import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RefpInserirComponent} from './refp-inserir/refp-inserir.component';
import {RecursoHumanoComponent as REFP_RH_Component} from './refp-inserir/recurso-humano.component';
import {RecursoMaterialComponent as REFP_RC_Component} from './refp-inserir/recurso-material.component';
import {ExtratoFinanceiroEmpresasComponent} from './extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import {RefpListComponent} from './refp-list/refp-list.component';
import {AlterarProjetoComponent} from './alterar-projeto/alterar-projeto.component';
import {ProrrogarComponent} from './prorrogar/prorrogar.component';
import {RecursosHumanosComponent} from '../common/recursos-humanos/recursos-humanos.component';
import {RecursosMateriaisComponent} from '../common/recursos-materiais/recursos-materiais.component';
import {ConsultarDadosComponent} from './consultar-dados/consultar-dados.component';
import {PropostaBaseComponent} from './proposta-base/proposta-base.component';
import {OrcamentoEmpresasComponent} from '../common/orcamento-empresas/orcamento-empresas.component';
import {OrcamentoEtapasComponent} from '../common/orcamento-etapas/orcamento-etapas.component';
import {ProjetoStatusGuard} from '@app/dashboard/projeto/guards/projeto-status.guard';
import {ProjetoAccessGuard} from '@app/dashboard/projeto/guards/projeto-access.guard';


export const routes: Routes = [
    {
        path: '', redirectTo: 'refp-inserir', pathMatch: 'full'
    },
    {
        path: 'refp', redirectTo: 'refp/pendentes', pathMatch: 'full',
        canActivate: [ProjetoAccessGuard],
        data: {
            access: ['admin', 'leituraEscrita', 'aprovador']

        },
    },
    {
        path: 'refp-inserir', component: RefpInserirComponent,
        canActivate: [ProjetoAccessGuard],
        data: {
            access: ProjetoAccessGuard.ESCRITA,
            redirectTo: '/dashboard/projeto/:id/iniciado/extrato-financeiro'
        },
        children: [
            {path: '', redirectTo: 'recurso-humano', pathMatch: 'full'},
            {path: 'recurso-material', component: REFP_RC_Component},
            {path: 'recurso-humano', component: REFP_RH_Component}
        ]
    },
    {
        path: 'refp/:status', component: RefpListComponent,
        canActivate: [ProjetoAccessGuard],
        data: {
            access: ProjetoAccessGuard.ESCRITA,
            redirectTo: '/dashboard/projeto/:id/iniciado/extrato-financeiro'
        },
    },

    {
        path: 'extrato-financeiro', component: ExtratoFinanceiroEmpresasComponent,
    },
    {
        path: 'alterar', component: AlterarProjetoComponent,
        canActivate: [ProjetoAccessGuard],
        data: {access: ['admin']},
        children: [
            {path: '', redirectTo: 'prorrogar', pathMatch: 'full'},
            {path: 'prorrogar', component: ProrrogarComponent},
            {path: 'recursos-humanos', component: RecursosHumanosComponent},
            {path: 'recursos-materiais', component: RecursosMateriaisComponent}

        ]
    },
    {
        path: 'consultar', component: ConsultarDadosComponent,
        children: [
            {path: '', redirectTo: 'base', pathMatch: 'full'},
            {path: 'base', component: PropostaBaseComponent},
            {path: 'orcamento-empresas', component: OrcamentoEmpresasComponent},
            {path: 'orcamento-etapas', component: OrcamentoEtapasComponent}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IniciadoRoutingModule {
}
