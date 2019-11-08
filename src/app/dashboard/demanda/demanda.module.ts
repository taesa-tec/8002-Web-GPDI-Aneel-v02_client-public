import {NgModule} from '@angular/core';

import {DemandaComponent} from './demanda.component';
import {DemandaRoutingModule} from './demanda-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EspecificacaoTecnicaComponent} from './especificacao-tecnica/especificacao-tecnica.component';
import {TemasComponent} from './temas/temas.component';
import {DocumentoAprovacoesComponent} from './documento-aprovacoes/documento-aprovacoes.component';
import {PreAprovacaoComponent} from './pre-aprovacao/pre-aprovacao.component';
import {EquipeValidacaoComponent} from './equipe-validacao/equipe-validacao.component';
import {FormEditorComponent} from '@app/dashboard/demanda/form-editor/form-editor.component';
import { EtapaAvaliacaoComponent } from './etapa-avaliacao/etapa-avaliacao.component';
import { EnviarProximaEtapaComponent } from './etapa-avaliacao/enviar-proxima-etapa/enviar-proxima-etapa.component';
import { AvaliarDemandaComponent } from './etapa-avaliacao/avaliar-demanda/avaliar-demanda.component';
import { DefinirRevisorComponent } from './etapa-avaliacao/definir-revisor/definir-revisor.component';

@NgModule({
  imports: [DemandaRoutingModule, SharedModule],
  exports: [],
  declarations: [
    DemandaComponent,
    FormEditorComponent,
    EquipeValidacaoComponent,
    EspecificacaoTecnicaComponent,
    TemasComponent,
    DocumentoAprovacoesComponent,
    PreAprovacaoComponent,
    EtapaAvaliacaoComponent,
    EnviarProximaEtapaComponent,
    AvaliarDemandaComponent,
    DefinirRevisorComponent
  ],
  providers: [],
})
export class DemandaModule {
}
