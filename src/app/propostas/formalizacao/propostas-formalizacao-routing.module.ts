import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CaptacoesResolver} from '@app/resolvers';
import {CaptacaoButtons, CaptacaoCols} from '@app/captacao';
import {ListComponent} from './list/list.component';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';

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
          empresas: EmpresasResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.FormalizacaoPendente,
            buttons: CaptacaoButtons.FormalizacaoPendente,
            status: 'FormalizacaoPendente'
          }
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'formalizados',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Formalizados,
            buttons: CaptacaoButtons.Formalizados,
            status: 'Formalizados'
          }
        }
      },
      {
        path: 'no-deal',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.NoDeal,
            buttons: CaptacaoButtons.NoDeal,
            status: 'NoDeal'
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
export class PropostasFormalizacaoRoutingModule {
}
