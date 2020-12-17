import {NgModule} from '@angular/core';

import {DemandaComponent} from './demanda.component';
import {DocumentoAprovacoesComponent} from './documento-aprovacoes/documento-aprovacoes.component';
import {AprovacaoComponent} from './aprovacao/aprovacao.component';
import {EquipeValidacaoComponent} from './equipe-validacao/equipe-validacao.component';
import {FormEditorComponent} from '@app/shared/demandas/demanda/form-editor/form-editor.component';
import {EtapaAvaliacaoComponent} from './etapa-avaliacao/etapa-avaliacao.component';
import {AvaliarDemandaComponent} from './aprovacao/avaliar-demanda/avaliar-demanda.component';
import {DefinirRevisorComponent} from './aprovacao/definir-revisor/definir-revisor.component';
import {DemandaComentarioComponent} from './demanda-comentarios/demanda-comentario/demanda-comentario.component';
import {DemandaComentariosComponent} from './demanda-comentarios/demanda-comentarios.component';
import {DemandaGuard} from '@app/shared/demandas/demanda/guards/demanda.guard';
import {DemandaLogsComponent} from '@app/shared/demandas/demanda/demanda-logs/demanda-logs.component';
import {LogComponent} from '@app/shared/demandas/demanda/demanda-logs/log.component';
import {LoggerModule} from '@app/dashboard/logger/logger.module';
import {FormViewerComponent} from '@app/shared/demandas/demanda/form-viewer/form-viewer.component';
import {HistoricoComponent} from './historico/historico.component';
import {DemandaResolver} from '@app/shared/demandas/demanda/demanda.resolver';
import {CoreModule} from '@app/core';
import {DemandaRoutingModule} from '@app/shared/demandas/demanda/demanda-routing.module';
import {SharedModule} from '@app/dashboard/shared';

const components = [
  DemandaComponent,
  FormEditorComponent,
  EquipeValidacaoComponent,
  DocumentoAprovacoesComponent,
  AprovacaoComponent,
  EtapaAvaliacaoComponent,
  AvaliarDemandaComponent,
  DefinirRevisorComponent,
  DemandaComentarioComponent,
  DemandaComentariosComponent,
  DemandaLogsComponent,
  LogComponent,
  FormViewerComponent,
  HistoricoComponent
];

@NgModule({
  imports: [CoreModule, LoggerModule, DemandaRoutingModule, SharedModule],
  declarations: [...components],
  exports: [...components],
  providers: [DemandaGuard, DemandaResolver],
})
export class DemandaModule {
}
