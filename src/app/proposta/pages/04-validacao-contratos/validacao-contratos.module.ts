import {NgModule} from '@angular/core';
import {SharedModule} from '@app/dashboard/shared/shared.module';

import {ValidacaoContratosRoutingModule} from './validacao-contratos-routing.module';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {ContratoResolver} from '@app/proposta/resolvers';
import {HistoricoComponent} from './historico/historico.component';


@NgModule({
  declarations: [
    ViewContratoComponent,
    HistoricoComponent
  ],
  imports: [
    SharedModule,
    ValidacaoContratosRoutingModule
  ],
  providers: [ContratoResolver]
})
export class ValidacaoContratosModule {
}
