import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PropostasRefinamentoResolver} from '@app/user-shared/propostas-refinamento/propostas-refinamento.resolver';
import {ListComponent} from '@app/user-shared/propostas-refinamento/list/list.component';
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
    loadChildren: () => import('@app/proposta/proposta.module').then(m => m.PropostaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasRefinamentoRoutingModule {
}
