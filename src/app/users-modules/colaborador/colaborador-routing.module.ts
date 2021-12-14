import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {
  DemandasRoute,
  MeuCadastroRoute,
  RedirectRoute
} from '@app/routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      RedirectRoute('demandas'),
      MeuCadastroRoute,
      DemandasRoute,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule {
}
