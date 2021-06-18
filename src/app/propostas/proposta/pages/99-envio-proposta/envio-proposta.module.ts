import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnvioPropostaRoutingModule} from './envio-proposta-routing.module';
import {EnvioPropostaComponent} from './envio-proposta.component';
import {PropostaDocumentoResolver, PropostaErrosResolver} from '@app/propostas/proposta/resolvers';
import {CoreModule} from '@app/core';
import {ComponentsModule} from '@app/propostas/proposta/components/components.module';


@NgModule({
  declarations: [EnvioPropostaComponent],
  imports: [
    CommonModule,
    EnvioPropostaRoutingModule,
    CoreModule,
    ComponentsModule
  ],
  providers: [PropostaDocumentoResolver, PropostaErrosResolver]
})
export class EnvioPropostaModule {
}
