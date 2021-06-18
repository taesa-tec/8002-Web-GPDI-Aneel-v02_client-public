import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {CoExecutoresRoutingModule} from './co-executores-routing.module';
import {CoExecutoresComponent} from './co-executores.component';
import {CoExecutorFormComponent} from './co-executor-form/co-executor-form.component';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {CoExecutoresResolver, CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [
    CoExecutoresComponent,
    CoExecutorFormComponent, ViewContratoComponent
  ],
  providers: [
    PropostaServiceBase.fromAppend('CoExecutores'),
    CoExecutoresResolver,
    CrudItemResolver,
    CrudDataResolver,
  ],
  imports: [
    SharedModule,
    CoExecutoresRoutingModule
  ]
})
export class CoExecutoresModule {
}
