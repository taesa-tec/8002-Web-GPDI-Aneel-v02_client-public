import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DevelopmentComponent} from '@app/user-fornecedor/propostas/proposta/development/development.component';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';

/*
Detalhes
Condições fundamentais
Cadastro Co-Executores
Validação contrato
Plano de trabalho
Escopo
Produtos
Etapas
Tabela de Riscos
Recursos Humanos
Alocação de Recursos Humanos
Recursos Materiais
Alocação de Recursos Materiais
Envio Proposta para aprovação
 */
const routes: Routes = [
  {
    path: '',
    component: PropostaComponent,
    children: [
      {path: 'detalhes', loadChildren: () => import('./01-detalhes-demanda/detalhes-demanda.module').then(m => m.DetalhesDemandaModule)},
      {path: 'condicoes', component: DevelopmentComponent},
      {path: 'co-executores', loadChildren: () => import('./03-co-executores/co-executores.module').then(m => m.CoExecutoresModule)},
      {
        path: 'contrato',
        loadChildren: () => import('./04-validacao-contratos/validacao-contratos.module').then(m => m.ValidacaoContratosModule)
      },
      {path: 'plano-de-trabalho', loadChildren: () => import('./05-plano-trabalho/plano-trabalho.module').then(m => m.PlanoTrabalhoModule)},
      {path: 'escopo', loadChildren: () => import('./06-escopo/escopo.module').then(m => m.EscopoModule)},
      {path: 'produtos', loadChildren: () => import('./07-produtos/produtos.module').then(m => m.ProdutosModule)},
      {path: 'etapas', loadChildren: () => import('./08-etapas/etapas.module').then(m => m.EtapasModule)},
      {path: 'riscos', loadChildren: () => import('./09-riscos/riscos.module').then(m => m.RiscosModule)},
      {
        path: 'recursos-humanos',
        loadChildren: () => import('./10-recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule)
      },
      {
        path: 'alocacao-recursos-humanos',
        loadChildren: () => import('./11-alocacao-recursos-humanos/alocacao-recursos-humanos.module')
          .then(m => m.AlocacaoRecursosHumanosModule)
      },
      {
        path: 'recursos-materiais',
        loadChildren: () => import('./12-recursos-materiais/recursos-materiais.module').then(m => m.RecursosMateriaisModule)
      },
      {
        path: 'alocacao-recursos-materiais',
        loadChildren: () => import('./13-alocacao-recursos-materiais/alocacao-recursos-materiais.module')
          .then(m => m.AlocacaoRecursosMateriaisModule)
      },
      {path: 'envio', component: DevelopmentComponent},
      {path: '**', redirectTo: 'detalhes', pathMatch: 'full'}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostaRoutingModule {
}
