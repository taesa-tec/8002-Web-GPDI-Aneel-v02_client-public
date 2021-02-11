import {NgModule} from '@angular/core';
import {SharedModule} from '@app/dashboard/shared/shared.module';

import {ValidacaoContratosRoutingModule} from './validacao-contratos-routing.module';
import {ValidacaoContratosComponent} from './validacao-contratos.component';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {ContratoResolver, ContratosResolver} from '@app/user-fornecedor/resolvers/contratos.resolver';


@NgModule({
  declarations: [
    ValidacaoContratosComponent,
    ViewContratoComponent
  ],
  imports: [
    SharedModule,
    ValidacaoContratosRoutingModule
  ],
  providers: [ContratosResolver, ContratoResolver]
})
export class ValidacaoContratosModule {
}
