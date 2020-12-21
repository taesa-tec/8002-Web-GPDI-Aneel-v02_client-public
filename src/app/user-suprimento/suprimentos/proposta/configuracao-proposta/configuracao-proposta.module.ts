import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ConfiguracaoPropostaRoutingModule } from './configuracao-proposta-routing.module';
import { ConfiguracaoPropostaComponent } from './configuracao-proposta.component';


@NgModule({
  declarations: [
    ConfiguracaoPropostaComponent,
  ],
  imports: [
    SharedModule,
    ConfiguracaoPropostaRoutingModule
  ]
})
export class ConfiguracaoPropostaModule { }
