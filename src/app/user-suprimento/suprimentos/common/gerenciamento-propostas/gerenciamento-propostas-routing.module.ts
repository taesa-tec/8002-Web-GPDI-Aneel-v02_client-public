import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciamentoPropostasComponent } from './gerenciamento-propostas.component';
import { PropostasListComponent } from './propostas-list/propostas-list.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciamentoPropostasComponent,
    children: [
      {
        path: '',
        redirectTo: 'aberto',
        pathMatch: 'full',
      },
      {
        path: 'aberto',
        component: PropostasListComponent,
        data: {
          propostaEtapaStatus: 'aberto'
        } 
      },
      {
        path: 'recebidas',
        component: PropostasListComponent,
        data: {
          propostaEtapaStatus: 'recebidas'
        } 
      },
      {
        path: 'negadas',
        component: PropostasListComponent,
        data: {
          propostaEtapaStatus: 'negadas'
        } 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoPropostasRoutingModule { }
