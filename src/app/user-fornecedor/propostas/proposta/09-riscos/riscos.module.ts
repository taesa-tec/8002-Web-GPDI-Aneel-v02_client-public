import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RiscosRoutingModule} from './riscos-routing.module';
import {RiscosComponent} from './riscos.component';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {RiscosService} from '@app/user-fornecedor/services/propostas.service';
import {RiscoResolver, RiscosResolver} from '@app/user-fornecedor/resolvers/riscos.resolver';


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
    RiscosService,
    RiscosResolver,
    RiscoResolver
  ]
})
export class RiscosModule {
}
