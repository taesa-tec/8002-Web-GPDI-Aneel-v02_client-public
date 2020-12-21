import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule {
}
