import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';

import { PropostaRoutingModule } from './proposta-routing.module';
import { ConfiguracaoPropostaModule } from './configuracao-proposta/configuracao-proposta.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PropostaRoutingModule,
    ConfiguracaoPropostaModule
  ]
})
export class PropostaModule { }
