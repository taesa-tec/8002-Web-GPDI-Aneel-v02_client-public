import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {MeuCadastroRoute} from '@app/routes';


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
        // component: SidebarComponent,
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
      {
        path: 'refinamento',
        loadChildren: () => import('@app/pages/propostas/refinamento/propostas-refinamento.module')
          .then(m => m.PropostasRefinamentoModule)
      }, {
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule {
}
