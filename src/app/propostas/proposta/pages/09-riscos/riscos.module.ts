import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RiscosRoutingModule} from './riscos-routing.module';
import {RiscosComponent} from './riscos.component';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/propostas/proposta/resolvers';
import {PropostaServiceBase} from '@app/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [
    RiscosComponent,
    RiscoFormComponent
  ],
  imports: [
    SharedModule,
    RiscosRoutingModule
  ],
  providers: [
    CrudItemResolver,
    CrudDataResolver,
    PropostaServiceBase.fromAppend('Riscos')
  ]
})
export class RiscosModule {
}
