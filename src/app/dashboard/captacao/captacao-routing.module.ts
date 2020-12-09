import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CaptacaoComponent} from '@app/dashboard/captacao/captacao.component';
import {CaptacoesResolver} from '@app/dashboard/captacao/captacoes.resolver';
import {ListComponent} from '@app/dashboard/captacao/list/list.component';
import {CaptacaoButtons, CaptacaoCols} from '@app/dashboard/captacao/commons';


const routes: Routes = [
  {
    path: '',
    component: CaptacaoComponent,
    children: [
      {
        path: '',
        redirectTo: 'pendente',
        pathMatch: 'full',
      },
      {
        path: 'pendente',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          cols: CaptacaoCols.Pendente,
          buttons: CaptacaoButtons.Pendente,
          status: 'Pendentes'
        }
      },
      {
        path: 'elaboracao',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          cols: CaptacaoCols.EmElaboracao,
          buttons: CaptacaoButtons.EmElaboracao,
          status: 'Elaboracao'
        }
      },
      {
        path: 'aberta',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          cols: CaptacaoCols.Aberta,
          buttons: CaptacaoButtons.Aberta,
          status: 'Abertas'
        }
      },
      {
        path: 'encerrada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          cols: CaptacaoCols.Encerrada,
          buttons: CaptacaoButtons.Encerrada,
          status: 'Encerradas'
        }
      },
      {
        path: 'cancelada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          cols: CaptacaoCols.Cancelada,
          buttons: CaptacaoButtons.Cancelada,
          status: 'Canceladas'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacaoRoutingModule {
}
