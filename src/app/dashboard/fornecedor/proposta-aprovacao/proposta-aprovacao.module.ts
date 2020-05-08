import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { PropostaAprovacaoRoutingModule } from './proposta-aprovacao-routing.module';
import { PropostaAprovacaoComponent } from './proposta-aprovacao.component';


@NgModule({
  declarations: [
    PropostaAprovacaoComponent
  ],
  imports: [
    SharedModule,
    PropostaAprovacaoRoutingModule
  ]
})
export class PropostaAprovacaoModule { }
