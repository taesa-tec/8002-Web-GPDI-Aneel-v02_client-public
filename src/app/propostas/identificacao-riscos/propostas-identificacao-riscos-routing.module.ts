import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CaptacoesResolver} from '@app/resolvers';
import {CaptacaoButtons, CaptacaoCols} from '@app/captacao';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';
import {ListComponent} from '@app/propostas/identificacao-riscos/list/list.component';
import {HomeComponent} from '@app/propostas/identificacao-riscos/home/home.component';

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
          equipe: EquipePedResolver,
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.IdentificaoPendente,
            buttons: CaptacaoButtons.IdentificaoPendente,
            status: 'IdentificaoRiscoPendente'
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
            cols: CaptacaoCols.IdentificaoFinalizada,
            buttons: CaptacaoButtons.IdentificaoFinalizada,
            status: 'IdentificaoRiscoFinalizada'
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
export class PropostasIdentificacaoRiscosRoutingModule {
}
