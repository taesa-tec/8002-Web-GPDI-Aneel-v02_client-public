import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {MeuCadastroRoute} from '@app/user-shared';


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
        loadChildren: () => import('@app/user-shared/demandas/demandas.module').then(m => m.DemandasModule)
      },
      {
        path: 'captacoes',
        component: SidebarComponent,
        loadChildren: () => import('@app/user-shared/captacao/captacao.module').then(m => m.CaptacaoModule)
      },
      {
        path: 'riscos',
        component: SidebarComponent,
        loadChildren: () => import('@app/user-shared/propostas-selecao/propostas-selecao.module').then(m => m.PropostasSelecaoModule)
      },
      {
        path: 'refinamento',
        loadChildren: () => import('@app/user-shared/propostas-refinamento/propostas-refinamento.module')
          .then(m => m.PropostasRefinamentoModule)
      }, {
        path: 'identificacao-riscos',
        loadChildren: () => import('@app/user-shared/propostas-identificacao-riscos/propostas-identificacao-riscos.module')
          .then(m => m.PropostasIdentificacaoRiscosModule)
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
