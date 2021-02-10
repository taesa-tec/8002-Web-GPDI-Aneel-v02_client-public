import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {CoExecutoresRoutingModule} from './co-executores-routing.module';
import {CoExecutoresComponent} from './co-executores.component';
import {CoExecutorFormComponent} from './co-executor-form/co-executor-form.component';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {CoExecutoresResolver} from '@app/user-fornecedor/resolvers/co-executores.resolver';


@NgModule({
  declarations: [
    CoExecutoresComponent,
    CoExecutorFormComponent, ViewContratoComponent
  ],
  providers: [CoExecutoresResolver],
  imports: [
    SharedModule,
    CoExecutoresRoutingModule
  ]
})
export class CoExecutoresModule {
}
