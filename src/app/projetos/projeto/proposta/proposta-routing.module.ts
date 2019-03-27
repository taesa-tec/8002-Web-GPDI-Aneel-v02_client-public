import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoComponent } from '../projeto.component';
import { InfoComponent } from './info/info.component';
import { TemasComponent } from './temas/temas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { EtapasComponent } from './etapas/etapas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { RecursosHumanosComponent } from '../common/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '../common/recursos-materiais/recursos-materiais.component';
import { OrcamentoEmpresasComponent } from './orcamento-empresas/orcamento-empresas.component';
import { OrcamentoEtapasComponent } from './orcamento-etapas/orcamento-etapas.component';
import { AlocacaoComponent as AlocacaoHComponent } from './recursos-humanos/alocacao.component';
import { AlocacaoComponent as AlocacaoMComponent } from './recursos-materiais/alocacao.component';
import { ProjetoResolverService } from '@app/projetos/projeto-resolver.service';
import { AtividadesComponent } from './atividades/atividades.component';
import { OrcamentoAtividadesComponent } from './orcamento-atividades/orcamento-atividades.component';

const routes: Routes = [
    {
        path: 'dashboard/projeto/:id/proposta', component: ProjetoComponent, children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            {
                path: 'info', component: InfoComponent,
            },
            {
                path: 'atividades', component: AtividadesComponent,
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
                path: 'extrato-financeiro-empresas', component: OrcamentoEmpresasComponent,
            },
            {
                path: 'extrato-financeiro-etapas', component: OrcamentoEtapasComponent,
            },
            {
                path: 'extrato-financeiro-atividades', component: OrcamentoAtividadesComponent,
            },
            { path: '**', redirectTo: 'info', pathMatch: 'full' }
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
export class PropostaRoutingModule { }
