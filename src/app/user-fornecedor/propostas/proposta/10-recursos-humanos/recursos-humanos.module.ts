import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RecursosHumanosRoutingModule} from './recursos-humanos-routing.module';
import {RecursosHumanosComponent} from './recursos-humanos.component';
import {RecursoHumanoFormComponent} from './recurso-humano-form/recurso-humano-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';
import {CoExecutoresResolver} from '@app/user-fornecedor/resolvers/co-executores.resolver';


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
