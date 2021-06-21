import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {ConfiguracaoRoute, GerenciarUsuariosRoute, MeuCadastroRoute, ProjetosRoute, PropostaRefinamentoRoute} from '@app/routes/routes';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      MeuCadastroRoute,
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'demandas'
      },
      {
        path: 'demandas',
        loadChildren: () => import('@app/pages/demandas/demandas.module').then(m => m.DemandasModule)
      },
      {
        path: 'captacoes',
        component: SidebarComponent,
        loadChildren: () => import('@app/pages/captacao/captacao.module').then(m => m.CaptacaoModule)
      },
      {
        path: 'selecao',
        component: SidebarComponent,
        loadChildren: () => import('@app/pages/propostas/selecao/propostas-selecao.module').then(m => m.PropostasSelecaoModule)
      },
      PropostaRefinamentoRoute,
      {
        path: 'identificacao-riscos',
        component: SidebarComponent,
        loadChildren: () => import('@app/pages/propostas/identificacao-riscos/propostas-identificacao-riscos.module')
          .then(m => m.PropostasIdentificacaoRiscosModule)
      },
      {
        path: 'formalizacao',
        component: SidebarComponent,
        loadChildren: () => import('@app/pages/propostas/formalizacao/propostas-formalizacao.module')
          .then(m => m.PropostasFormalizacaoModule)
      },
      ProjetosRoute,
      ConfiguracaoRoute,
      GerenciarUsuariosRoute,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
