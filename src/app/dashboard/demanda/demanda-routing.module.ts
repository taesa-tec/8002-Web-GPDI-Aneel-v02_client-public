import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandaComponent } from './demanda.component';
import { EquipeValidacaoComponent } from './equipe-validacao/equipe-validacao.component';
import { DocumentoAprovacoesComponent } from './documento-aprovacoes/documento-aprovacoes.component';
import { TemasComponent } from './temas/temas.component';
import { EspecificacaoTecnicaComponent } from './especificacao-tecnica/especificacao-tecnica.component';
import { PreAprovacaoComponent } from './pre-aprovacao/pre-aprovacao.component';

const routes: Routes = [
  {
    path: ":id",
    component: DemandaComponent,
    children: [
      {
        path: '',
        redirectTo: 'equipe-validacao',
        pathMatch: 'full',
      },
      {
        path: 'equipe-validacao',
        component: EquipeValidacaoComponent
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
        loadChildren: '@app/dashboard/demanda/central-administrativa/central-administrativa.module#CentralAdministrativaModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class DemandaRoutingModule { }
