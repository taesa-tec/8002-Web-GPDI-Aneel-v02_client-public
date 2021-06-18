import {NgModule} from '@angular/core';
import {SharedModule} from '@app/dashboard/shared/shared.module';

import {ValidacaoContratosRoutingModule} from './validacao-contratos-routing.module';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {ContratoResolver} from '@app/propostas/proposta/resolvers';
import {HistoricoComponent} from './historico/historico.component';
import {ComponentsModule} from '@app/propostas/proposta/components/components.module';


@NgModule({
  declarations: [
    ViewContratoComponent,
    HistoricoComponent
  ],
    imports: [
        SharedModule,
        ValidacaoContratosRoutingModule,
        ComponentsModule
    ],
  providers: [ContratoResolver]
})
export class ValidacaoContratosModule {
}
