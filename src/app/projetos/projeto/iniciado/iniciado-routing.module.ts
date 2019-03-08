import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoComponent } from '../projeto.component';
import { ProjetoResolverService } from '@app/projetos/projeto-resolver.service';
import { RefpInserirComponent } from './refp-inserir/refp-inserir.component';
import { RecursoHumanoComponent as REFP_RH_Component } from './refp-inserir/recurso-humano.component';
import { RecursoMaterialComponent as REFP_RC_Component } from './refp-inserir/recurso-material.component';
import { ExtratoFinanceiroEmpresasComponent } from './extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { RefpListComponent } from './refp-list/refp-list.component';
import { AlterarProjetoComponent } from './alterar-projeto/alterar-projeto.component';
import { ProrrogarComponent } from './prorrogar/prorrogar.component';
import { RecursosHumanosComponent } from '../common/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '../common/recursos-materiais/recursos-materiais.component';
import { ConsultarDadosComponent } from './consultar-dados/consultar-dados.component';
import { PropostaBaseComponent } from './proposta-base/proposta-base.component';
import { OrcamentoEmpresasComponent } from '../proposta/orcamento-empresas/orcamento-empresas.component';
import { OrcamentoEtapasComponent } from '../proposta/orcamento-etapas/orcamento-etapas.component';


const routes: Routes = [
    {
        path: 'dashboard/projeto/:id/iniciado', component: ProjetoComponent, children: [
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
                path: 'extrato-financeiro', component: ExtratoFinanceiroEmpresasComponent,
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
                children: [
                    { path: '', redirectTo: 'base', pathMatch: 'full' },
                    { path: 'base', component: PropostaBaseComponent },
                    { path: 'orcamento-empresas', component: OrcamentoEmpresasComponent },
                    { path: 'orcamento-etapas', component: OrcamentoEtapasComponent }
                ]
            }
        ],
        resolve: {
            projeto: ProjetoResolverService
        },

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class IniciadoRoutingModule { }