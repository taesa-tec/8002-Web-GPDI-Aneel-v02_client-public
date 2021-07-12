import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {MeuCadastroRoute, NotFoundRoute, RedirectRoute} from '@app/routes';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      RedirectRoute('captacoes'),
      MeuCadastroRoute,
      {
        path: 'captacoes',
        loadChildren: () => import('./captacoes/captacoes.module').then(m => m.CaptacoesModule)
      },
      NotFoundRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprimentoRoutingModule {
}
