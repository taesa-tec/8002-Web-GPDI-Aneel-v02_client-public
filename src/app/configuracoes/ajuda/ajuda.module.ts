import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AjudaRoutingModule} from './ajuda-routing.module';
import {AjudaComponent} from './ajuda.component';
import {SharedModule} from '@app/dashboard/shared';
import {CrudDataResolver, CrudItemResolver} from '@app/configuracoes/ajuda/crud.resolver';
import {ServiceBase} from '@app/services';
import { AjudaFormComponent } from './ajuda-form.component';


@NgModule({
  declarations: [AjudaComponent, AjudaFormComponent],
  imports: [
    CommonModule,
    AjudaRoutingModule,
    SharedModule
  ],
  providers: [
    CrudDataResolver,
    CrudItemResolver,
    ServiceBase.fromAppend('Sistema/ItemAjuda')
  ]
})
export class AjudaModule {
}
