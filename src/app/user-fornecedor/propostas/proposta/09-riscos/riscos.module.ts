import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { RiscosRoutingModule } from './riscos-routing.module';
import { RiscosComponent } from './riscos.component';
import { RiscoFormComponent } from './risco-form/risco-form.component';


@NgModule({
  declarations: [
    RiscosComponent, 
    RiscoFormComponent
  ],
  imports: [
    SharedModule,
    RiscosRoutingModule
  ]
})
export class RiscosModule { }
