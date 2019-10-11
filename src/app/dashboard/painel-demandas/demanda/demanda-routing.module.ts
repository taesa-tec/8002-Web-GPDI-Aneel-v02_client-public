import { TemasComponent } from './temas/temas.component';
import { DocumentoAprovacoesComponent } from './documento-aprovacoes/documento-aprovacoes.component';
import { DefinicaoPessoasProcessoValidacaoComponent } from './definicao-pessoas-processo-validacao/definicao-pessoas-processo-validacao.component';
import { DemandaComponent } from './demanda.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspecificacaoTecnicaComponent } from './especificacao-tecnica/especificacao-tecnica.component';
import { PreAprovacaoComponent } from './pre-aprovacao/pre-aprovacao.component';

const routes: Routes = [
  {
    path: '',
    component: DemandaComponent,
    children: [
      {
        path: '',
        redirectTo: 'definicao-pessoas-processo-validacao',
        pathMatch: 'full',
      },
      {
        path: 'definicao-pessoas-processo-validacao',
        component: DefinicaoPessoasProcessoValidacaoComponent
      },
      {
        path: 'documento-e-aprovacoes',
        component: DocumentoAprovacoesComponent
      },
      {
        path: 'temas',
        component: TemasComponent
      },
      {
        path: 'especificacao-tecnica',
        component: EspecificacaoTecnicaComponent
      },
      {
        path: 'pre-aprovacao',
        component: PreAprovacaoComponent
      },
      {
        path: 'central-administrativa',
        loadChildren: '@app/dashboard/painel-demandas/demanda/central-administrativa/central-administrativa.module#CentralAdministrativaModule'
      },
      // {
      //   path: 'log-demanda',
      //   component: 
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandaRoutingModule { }
