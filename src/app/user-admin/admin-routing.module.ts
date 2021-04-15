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
        path: 'propostas-selecao',
        component: SidebarComponent,
        loadChildren: () => import('@app/user-shared/propostas-selecao/propostas-selecao.module').then(m => m.PropostasSelecaoModule)
      },
      {
        path: 'propostas',
        //component: SidebarComponent,
        loadChildren: () => import('@app/proposta/proposta.module').then(m => m.PropostaModule)
      },
      {
        path: 'configuracoes',
        component: SidebarComponent,
        loadChildren: () => import('./configuracoes/configuracoes-sistema.module').then(m => m.ConfiguracoesSistemaModule)
      },
      {
        path: 'gerenciar-usuarios',
        loadChildren: () => import('./gerenciar-usuarios/gerenciar-usuarios.module').then(m => m.GerenciarUsuariosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
