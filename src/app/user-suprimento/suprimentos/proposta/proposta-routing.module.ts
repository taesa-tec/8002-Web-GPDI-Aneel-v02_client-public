import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesProjetoComponent } from '../common/detalhes-projeto/detalhes-projeto.component';
import { ConfiguracaoPropostaComponent } from './configuracao-proposta/configuracao-proposta.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'detalhes-projeto',
    pathMatch: 'full'
  },
  {
    path: 'detalhes-projeto',
    component: DetalhesProjetoComponent
  },
  {
    path: 'configuracao-proposta',
    component: ConfiguracaoPropostaComponent
  },
  {
    path: 'gerenciamento-propostas',
    loadChildren: () => import('@app/user-suprimento/suprimentos/common/gerenciamento-propostas/gerenciamento-propostas.module').then(m => m.GerenciamentoPropostasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostaRoutingModule { }
