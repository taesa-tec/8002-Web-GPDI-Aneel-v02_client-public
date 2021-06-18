import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PropostasRefinamentoResolver} from '@app/pages/propostas/refinamento/propostas-refinamento.resolver';
import {ListComponent} from '@app/pages/propostas/refinamento/list/list.component';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          propostas: PropostasRefinamentoResolver
        },
      }
    ]
  },
  {
    path: 'proposta',
    loadChildren: () => import('@app/pages/propostas/proposta/proposta.module').then(m => m.PropostaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasRefinamentoRoutingModule {
}
