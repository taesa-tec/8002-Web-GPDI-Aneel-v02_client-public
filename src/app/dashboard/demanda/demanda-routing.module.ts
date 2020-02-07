import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandaComponent } from './demanda.component';
import { EquipeValidacaoComponent } from './equipe-validacao/equipe-validacao.component';
import { DocumentoAprovacoesComponent } from './documento-aprovacoes/documento-aprovacoes.component';
import { TemasComponent } from './temas/temas.component';
import { EspecificacaoTecnicaComponent } from './especificacao-tecnica/especificacao-tecnica.component';
import { AprovacaoComponent } from './aprovacao/aprovacao.component';
import { FormEditorComponent } from '@app/dashboard/demanda/form-editor/form-editor.component';
import { EtapaAvaliacaoComponent } from '@app/dashboard/demanda/etapa-avaliacao/etapa-avaliacao.component';
import { DemandaResolver } from '@app/dashboard/demanda/demanda.resolver';
import { DemandaGuard } from '@app/dashboard/demanda/guards/demanda.guard';
import { LogComponent } from '@app/dashboard/projeto/log-projeto/log.component';
import { DemandaLogsComponent } from '@app/dashboard/demanda/demanda-logs/demanda-logs.component';

const routes: Routes = [
  {
    path: ':id',
    component: DemandaComponent,
    canActivate: [DemandaGuard],
    resolve: {
      demanda: DemandaResolver
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'equipe-validacao',
        component: EquipeValidacaoComponent
      },
      {
        path: 'formulario/:form',
        component: FormEditorComponent,
      },
      {
        path: 'documento-aprovacoes',
        component: DocumentoAprovacoesComponent
      },
      {
        path: 'aprovacao',
        component: AprovacaoComponent
      },
      {
        path: 'historico',
        component: AprovacaoComponent
      },
      {
        path: 'central-administrativa',
        loadChildren: '@app/dashboard/demanda/central-administrativa/central-administrativa.module#CentralAdministrativaModule'
      },
      {
        path: 'logs',
        component: DemandaLogsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class DemandaRoutingModule {
}
