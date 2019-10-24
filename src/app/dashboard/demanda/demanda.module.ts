import { NgModule } from '@angular/core';

import { DemandaComponent } from './demanda.component';
import { DemandaRoutingModule } from './demanda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EspecificacaoTecnicaComponent } from './especificacao-tecnica/especificacao-tecnica.component';
import { TemasComponent } from './temas/temas.component';
import { DocumentoAprovacoesComponent } from './documento-aprovacoes/documento-aprovacoes.component';
import { PreAprovacaoComponent } from './pre-aprovacao/pre-aprovacao.component';
import { EquipeValidacaoComponent } from './equipe-validacao/equipe-validacao.component';

@NgModule({
  imports: [DemandaRoutingModule, SharedModule],
  exports: [],
  declarations: [
    DemandaComponent,
    EquipeValidacaoComponent,
    EspecificacaoTecnicaComponent,
    TemasComponent,
    DocumentoAprovacoesComponent,
    PreAprovacaoComponent
  ],
  providers: [],
})
export class DemandaModule { }
