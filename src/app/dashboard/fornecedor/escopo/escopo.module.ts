import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';

import { EscopoRoutingModule } from './escopo-routing.module';
import { EscopoComponent } from './escopo.component';


@NgModule({
  declarations: [EscopoComponent],
  imports: [
    SharedModule,
    EscopoRoutingModule
  ]
})
export class EscopoModule { }
