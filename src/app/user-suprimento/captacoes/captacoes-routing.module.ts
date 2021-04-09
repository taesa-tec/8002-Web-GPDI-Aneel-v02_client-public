import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CaptacaoCols} from '@app/user-shared/captacao';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {CaptacoesComponent} from './captacoes.component';
import {CaptacaoResolver} from '@app/user-suprimento/resolvers/captacao.resolver';
import {CaptacoesResolver} from '@app/user-suprimento/resolvers/captacoes.resolver';
import {ListComponent} from '@app/user-suprimento/captacoes/list.component';
import {RouterMacherId} from '@app/core';


const routes: Routes = [
  {
    matcher: RouterMacherId,
    resolve: {
      captacao: CaptacaoResolver
    },
    loadChildren: () => import('./captacao/captacao.module').then(m => m.CaptacaoModule)
  },
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: CaptacoesComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'pendentes'},
          {
            path: 'pendentes',
            component: ListComponent,
            resolve: {
              captacoes: CaptacoesResolver
            },
            data: {
              captacaoTable: {
                cols: CaptacaoCols.EmElaboracao,
                buttons: [{
                  action: '/suprimento/captacoes/${id}',
                  text: 'Configurar',
                  isLink: true,
                  icon: 'ta-edit',
                  className: 'btn btn-primary'
                }],
              }
            }
          },
          {
            path: 'abertas',
            component: ListComponent,
            resolve: {
              captacoes: CaptacoesResolver
            },
            data: {
              captacaoTable: {
                cols: CaptacaoCols.EmElaboracao,
                buttons: [{
                  action: '/suprimento/captacoes/${id}',
                  text: 'Configurar',
                  isLink: true,
                  icon: 'ta-edit',
                  className: 'btn btn-primary'
                }],
              }
            }
          },
          {
            path: 'finalizadas',
            component: ListComponent,
            resolve: {
              captacoes: CaptacoesResolver
            },
            data: {
              captacaoTable: {
                cols: CaptacaoCols.EmElaboracao,
                buttons: [{
                  action: '/suprimento/captacoes/${id}',
                  text: 'Visualizar',
                  isLink: true,
                  icon: 'ta-edit',
                  className: 'btn btn-primary'
                }],
              }
            }
          }
        ]
      }
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacoesRoutingModule {
}
