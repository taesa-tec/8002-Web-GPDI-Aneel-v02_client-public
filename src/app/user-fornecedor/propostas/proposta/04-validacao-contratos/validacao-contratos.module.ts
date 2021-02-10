import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';

import { ValidacaoContratosRoutingModule } from './validacao-contratos-routing.module';
import { ValidacaoContratosComponent } from './validacao-contratos.component';
import { ViewContratoComponent } from './view-contrato/view-contrato.component';


@NgModule({
  declarations: [
    ValidacaoContratosComponent,
    ViewContratoComponent
  ],
  imports: [
    SharedModule,
    ValidacaoContratosRoutingModule
  ]
})
export class ValidacaoContratosModule { }
