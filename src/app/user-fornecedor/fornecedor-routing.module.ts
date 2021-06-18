import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
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
        redirectTo: 'propostas'
      },
      {
        path: 'propostas',
        loadChildren: () => import('./propostas/propostas.module').then(m => m.PropostasModule)
      },
      {
        path: 'proposta',
        //component: SidebarComponent,
        loadChildren: () => import('@app/propostas/proposta/proposta.module').then(m => m.PropostaModule)
      },
      {
        path: 'refinamento',
        loadChildren: () => import('@app/propostas/refinamento/propostas-refinamento.module')
          .then(m => m.PropostasRefinamentoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {
}
