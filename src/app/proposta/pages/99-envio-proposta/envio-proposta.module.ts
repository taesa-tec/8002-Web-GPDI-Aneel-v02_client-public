import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnvioPropostaRoutingModule} from './envio-proposta-routing.module';
import {EnvioPropostaComponent} from './envio-proposta.component';
import {PropostaDocumentoResolver, PropostaErrosResolver} from '@app/proposta/resolvers';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [EnvioPropostaComponent],
  imports: [
    CommonModule,
    EnvioPropostaRoutingModule,
    CoreModule
  ],
  providers: [PropostaDocumentoResolver, PropostaErrosResolver]
})
export class EnvioPropostaModule {
}
