import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesProjetoComponent } from '../common/detalhes-projeto/detalhes-projeto.component';


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
    path: 'alteracao-proposta',
    loadChildren: () => import('@app/dashboard/suprimentos/iniciado/alteracao-proposta/alteracao-proposta.module').then(m => m.AlteracaoPropostaModule)
  },
  {
    path: 'gerenciamento-propostas',
    loadChildren: () => import('@app/dashboard/suprimentos/common/gerenciamento-propostas/gerenciamento-propostas.module').then(m => m.GerenciamentoPropostasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciadoRoutingModule { }
