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
        redirectTo: 'recebidas',
        pathMatch: 'full',
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
