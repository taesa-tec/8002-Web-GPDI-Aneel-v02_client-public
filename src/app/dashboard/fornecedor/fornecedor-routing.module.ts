import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor.component';
import { DetalhesDemandaComponent } from './detalhes-demanda/detalhes-demanda.component';
import { RecursosMateriaisComponent } from './recursos-materiais/recursos-materiais.component';
import { AlocacaoRecursosMateriaisComponent } from './alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos.component';
import { AlocacaoRecursosHumanosComponent } from './alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import { RiscosComponent } from './riscos/riscos.component';
import { EtapasComponent } from './etapas/etapas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { EscopoComponent } from './escopo/escopo.component';
import { PlanoTrabalhoComponent } from './plano-trabalho/plano-trabalho.component';
import { CoExecutoresComponent } from './co-executores/co-executores.component';
import { ValidacaoContratoBaseComponent } from './validacao-contrato-base/validacao-contrato-base.component';
import { PropostaAprovacaoComponent } from './proposta-aprovacao/proposta-aprovacao.component';

const routes: Routes = [
  {
    path: '',
    component: FornecedorComponent,
    children: [
      {
        path: '',
        redirectTo: 'detalhes-demanda',
        pathMatch: 'full',
      },
      {
        path: 'detalhes-demanda',
        component: DetalhesDemandaComponent
      },
      {
        path: 'validacao-contrato-base',
        component: ValidacaoContratoBaseComponent
      },
      {
        path: 'co-executores',
        component: CoExecutoresComponent
      },
      {
        path: 'validacao-contratos',
        loadChildren: () => import('@app/dashboard/fornecedor/validacao-contratos/validacao-contratos.module').then(m => m.ValidacaoContratosModule)
      },
      {
        path: 'plano-trabalho',
        component: PlanoTrabalhoComponent
      },
      {
        path: 'escopo',
        component: EscopoComponent
      },
      {
        path: 'produtos',
        component: ProdutosComponent
      },
      {
        path: 'etapas',
        component: EtapasComponent
      },
      {
        path: 'tabela-riscos',
        component: RiscosComponent
      },
      {
        path: 'recursos-humanos',
        component: RecursosHumanosComponent
      },
      {
        path: 'alocacao-recursos-humanos',
        component: AlocacaoRecursosHumanosComponent
      },
      {
        path: 'resursos-materiais',
        component: RecursosMateriaisComponent
      },
      {
        path: 'alocacao-recursos-materiais',
        component: AlocacaoRecursosMateriaisComponent
      },
      {
        path: 'envio-proposta-aprovacao',
        component: PropostaAprovacaoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
