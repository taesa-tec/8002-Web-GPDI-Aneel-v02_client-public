import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
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
        redirectTo: 'captacoes'
      },
      {
        path: 'captacoes',
        loadChildren: () => import('./captacoes/captacoes.module').then(m => m.CaptacoesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprimentoRoutingModule {
}
