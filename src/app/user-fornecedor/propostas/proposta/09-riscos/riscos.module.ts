import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RiscosRoutingModule} from './riscos-routing.module';
import {RiscosComponent} from './riscos.component';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';


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
