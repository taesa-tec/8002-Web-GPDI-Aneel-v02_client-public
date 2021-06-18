import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmExecucaoComponent} from '@app/pages/projetos/em-execucao/em-execucao.component';
import {EmFinalizacaoComponent} from '@app/pages/projetos/em-finalizacao/em-finalizacao.component';
import {ProjetosResolver} from '@app/pages/projetos/projetos.resolver';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'em-execucao',
      },
      {
        path: 'em-execucao',
        component: EmExecucaoComponent,
        resolve: {
          projetos: ProjetosResolver
        },
        data: {
          status: 'EmExecucao'
        }
      },
      {
        path: 'em-finalizacao',
        component: EmFinalizacaoComponent,
        resolve: {
          projetos: ProjetosResolver
        },
        data: {
          status: 'Finalizados'
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule {
}
