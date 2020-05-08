import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetosCaptacaoListComponent } from './projetos-captacao-list/projetos-captacao-list.component';
import { ProjetosCaptacaoComponent } from './projetos-captacao.component';
import { CaptacaoEtapa } from './commons';

const routes: Routes = [
  {
    path: '',
    component: ProjetosCaptacaoComponent,
    children: [
      {
        path: '',
        redirectTo: 'pendente',
        pathMatch: 'full',
      },
      {
        path: 'pendente',
        component: ProjetosCaptacaoListComponent,
        data: {
          captacaoEtapaStatus: CaptacaoEtapa.Pendente
        }
      },
      {
        path: 'elaboracao',
        component: ProjetosCaptacaoListComponent,
        data: {
          captacaoEtapaStatus: CaptacaoEtapa.EmElaboracao
        }
      },
      {
        path: 'aberta',
        component: ProjetosCaptacaoListComponent,
        data: {
          captacaoEtapaStatus: CaptacaoEtapa.Aberta
        }
      },
      {
        path: 'encerrada',
        component: ProjetosCaptacaoListComponent,
        data: {
          captacaoEtapaStatus: CaptacaoEtapa.Encerrada
        }
      },
      {
        path: 'cancelada',
        component: ProjetosCaptacaoListComponent,
        data: {
          captacaoEtapaStatus: CaptacaoEtapa.Cancelada
        }
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosCaptacaoRoutingModule {
}
