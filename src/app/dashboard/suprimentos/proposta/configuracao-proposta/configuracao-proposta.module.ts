import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ConfiguracaoPropostaRoutingModule } from './configuracao-proposta-routing.module';
import { ConfiguracaoPropostaComponent } from './configuracao-proposta.component';
import { ViewContratoComponent } from './view-contrato/view-contrato.component';


@NgModule({
  declarations: [
    ConfiguracaoPropostaComponent,
    ViewContratoComponent
  ],
  imports: [
    SharedModule,
    ConfiguracaoPropostaRoutingModule
  ]
})
export class ConfiguracaoPropostaModule { }
