import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RecursosHumanosRoutingModule} from './recursos-humanos-routing.module';
import {RecursosHumanosComponent} from './recursos-humanos.component';
import {RecursoHumanoFormComponent} from './recurso-humano-form/recurso-humano-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/propostas/proposta/resolvers';
import {CoExecutoresResolver} from '@app/propostas/proposta/resolvers';
import {EmpresasResolver} from '@app/propostas/proposta/resolvers';
import {PropostaServiceBase} from '@app/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [
    RecursosHumanosComponent,
    RecursoHumanoFormComponent
  ],
  imports: [
    SharedModule,
    RecursosHumanosRoutingModule
  ],
  providers: [
    EmpresasResolver,
    CoExecutoresResolver,
    CrudItemResolver,
    CrudDataResolver,
    PropostaServiceBase.fromAppend('RecursosHumano')
  ]
})
export class RecursosHumanosModule {
}
