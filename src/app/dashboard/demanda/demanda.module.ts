import {NgModule} from '@angular/core';

import {DemandaComponent} from './demanda.component';
import {DemandaRoutingModule} from './demanda-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EspecificacaoTecnicaComponent} from './especificacao-tecnica/especificacao-tecnica.component';
import {TemasComponent} from './temas/temas.component';
import {DocumentoAprovacoesComponent} from './documento-aprovacoes/documento-aprovacoes.component';
import {AprovacaoComponent} from './aprovacao/aprovacao.component';
import {EquipeValidacaoComponent} from './equipe-validacao/equipe-validacao.component';
import {FormEditorComponent} from '@app/dashboard/demanda/form-editor/form-editor.component';
import {EtapaAvaliacaoComponent} from './etapa-avaliacao/etapa-avaliacao.component';
import {AvaliarDemandaComponent} from './aprovacao/avaliar-demanda/avaliar-demanda.component';
import {DefinirRevisorComponent} from './aprovacao/definir-revisor/definir-revisor.component';
import {DemandaComentarioComponent} from './demanda-comentarios/demanda-comentario/demanda-comentario.component';
import {DemandaComentariosComponent} from './demanda-comentarios/demanda-comentarios.component';
import {equipePeDProvider} from '@app/providers/equipe-ped.providers';
import {DemandaGuard} from '@app/dashboard/demanda/guards/demanda.guard';


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
    AprovacaoComponent,
    EtapaAvaliacaoComponent,
    AvaliarDemandaComponent,
    DefinirRevisorComponent,
    DemandaComentarioComponent,
    DemandaComentariosComponent
  ],
  providers: [equipePeDProvider, DemandaGuard],
})
export class DemandaModule {
}
