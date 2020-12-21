import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CaptacaoCols} from '@app/user-shared/captacao';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';
import {CaptacoesComponent} from './captacoes.component';
import {CaptacaoResolver} from '@app/user-suprimento/resolvers/captacao.resolver';
import {CaptacoesResolver} from '@app/user-suprimento/resolvers/captacoes.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: CaptacoesComponent,
        pathMatch: 'full',
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.EmElaboracao,
            buttons: [{action: '${id}', text: 'Configurar', isLink: true, icon: 'ta-edit', className: 'btn btn-primary'}],
            status: 'Elaboracao'
          }
        }
      }
    ],
  },
  {
    path: ':id',
    resolve: {
      captacao: CaptacaoResolver
    },
    loadChildren: () => import('./captacao/captacao.module').then(m => m.CaptacaoModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacoesRoutingModule {
}
