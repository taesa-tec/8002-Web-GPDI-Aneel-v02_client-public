import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {MeuCadastroRoute, NotFoundRoute, ProjetosRoute, PropostaRefinamentoRoute, RedirectRoute} from '@app/routes';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      RedirectRoute('propostas'),
      MeuCadastroRoute,
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'propostas'
      },
      {
        path: 'propostas',
        loadChildren: () => import('./propostas/propostas.module').then(m => m.PropostasModule)
      },

      {
        path: 'proposta',
        //component: SidebarComponent,
        loadChildren: () => import('@app/pages/propostas/proposta/proposta.module').then(m => m.PropostaModule)
      },
      ProjetosRoute,
      PropostaRefinamentoRoute,
      NotFoundRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {
}
