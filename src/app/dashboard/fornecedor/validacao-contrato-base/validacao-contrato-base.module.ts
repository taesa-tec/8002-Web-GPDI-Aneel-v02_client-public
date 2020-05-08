import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ValidacaoContratoBaseRoutingModule } from './validacao-contrato-base-routing.module';
import { ValidacaoContratoBaseComponent } from './validacao-contrato-base.component';
import { ClausulaFormComponent } from './clausula-form/clausula-form.component';


@NgModule({
  declarations: [
    ValidacaoContratoBaseComponent,
    ClausulaFormComponent
  ],
  imports: [
    SharedModule,
    ValidacaoContratoBaseRoutingModule
  ]
})
export class ValidacaoContratoBaseModule { }
