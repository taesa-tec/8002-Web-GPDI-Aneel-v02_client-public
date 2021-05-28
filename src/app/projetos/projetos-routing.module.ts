import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmExecucaoComponent} from '@app/projetos/em-execucao/em-execucao.component';
import {EmFinalizacaoComponent} from '@app/projetos/em-finalizacao/em-finalizacao.component';
import {ProjetosResolver} from '@app/projetos/projetos.resolver';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule {
}
