import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { AlteracaoPropostaRoutingModule } from './alteracao-proposta-routing.module';
import { AlteracaoPropostaComponent } from './alteracao-proposta.component';
import { ModalCancelarCaptacaoComponent } from './modal-cancelar-captacao/modal-cancelar-captacao.component';


@NgModule({
  declarations: [
    AlteracaoPropostaComponent,
    ModalCancelarCaptacaoComponent
  ],
  imports: [
    SharedModule,
    AlteracaoPropostaRoutingModule
  ]
})
export class AlteracaoPropostaModule { }
