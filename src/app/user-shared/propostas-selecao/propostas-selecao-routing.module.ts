import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '@app/user-shared/propostas-selecao/home/home.component';
import {PendenteComponent} from '@app/user-shared/propostas-selecao/pendente/pendente.component';
import {FinalizadaComponent} from '@app/user-shared/propostas-selecao/finalizada/finalizada.component';
import {CaptacoesResolver} from '@app/resolvers';
import {CaptacaoButtons, CaptacaoCols} from '@app/user-shared/captacao';
import {ListComponent} from '@app/user-shared/propostas-selecao/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendente'
      },
      {
        path: 'pendente',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.SelecaoPendente,
            buttons: CaptacaoButtons.SelecaoPendente,
            status: 'SelecaoPendente'
          }
        }
      },
      {
        path: 'finalizada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Pendente,
            buttons: CaptacaoButtons.Pendente,
            status: 'Finalizada'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasSelecaoRoutingModule {
}
