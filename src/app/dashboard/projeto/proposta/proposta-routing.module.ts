import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjetoComponent} from '../projeto.component';
import {InfoComponent} from './info/info.component';
import {TemasComponent} from './temas/temas.component';
import {ProdutosComponent} from '../common/produtos/produtos.component';
import {EtapasComponent} from './etapas/etapas.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {RecursosHumanosComponent} from '../common/recursos-humanos/recursos-humanos.component';
import {RecursosMateriaisComponent} from '../common/recursos-materiais/recursos-materiais.component';
import {OrcamentoEmpresasComponent} from '../common/orcamento-empresas/orcamento-empresas.component';
import {OrcamentoEtapasComponent} from '../common/orcamento-etapas/orcamento-etapas.component';
import {AlocacaoComponent as AlocacaoHComponent} from '../common/recursos-humanos/alocacao.component';
import {AlocacaoComponent as AlocacaoMComponent} from '../common/recursos-materiais/alocacao.component';
import {AtividadesComponent} from './atividades/atividades.component';
import {OrcamentoAtividadesComponent} from '../common/orcamento-atividades/orcamento-atividades.component';
import {ProjetoStatusGuard} from '@app/dashboard/projeto/guards/projeto-status.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'info', pathMatch: 'full'
    },
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
    {
        path: '**', redirectTo: 'info', pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropostaRoutingModule {
}
