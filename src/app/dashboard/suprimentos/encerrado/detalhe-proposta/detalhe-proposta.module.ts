import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { DetalhePropostaRoutingModule } from './detalhe-proposta-routing.module';
import { DetalhePropostaComponent } from './detalhe-proposta.component';


@NgModule({
  declarations: [
    DetalhePropostaComponent,
  ],
  imports: [
    SharedModule,
    DetalhePropostaRoutingModule
  ]
})
export class DetalhePropostaModule { }
