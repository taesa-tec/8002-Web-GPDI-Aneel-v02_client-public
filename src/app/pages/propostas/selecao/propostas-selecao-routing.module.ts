import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '@app/pages/propostas/selecao/home/home.component';
import {CaptacoesResolver} from '@app/resolvers';
import {CaptacaoButtons, CaptacaoCols} from '@app/pages/captacao';
import {ListComponent} from '@app/pages/propostas/selecao/list/list.component';
import {PropostaSelecaoResolver} from '@app/pages/propostas/selecao/proposta-selecao.resolver';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';

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
          captacoes: CaptacoesResolver,
          propostas: PropostaSelecaoResolver,
          equipe: EquipePedResolver,
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.SelecaoPendente,
            buttons: CaptacaoButtons.SelecaoPendente,
            status: 'SelecaoPendente'
          }
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'finalizada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.SelecaoFinalizada,
            buttons: CaptacaoButtons.SelecaoFinalizada,
            status: 'SelecaoFinalizada'
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
