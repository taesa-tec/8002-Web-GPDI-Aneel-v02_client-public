import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { SuprimentosRoutingModule } from './suprimentos-routing.module';
import { SuprimentosComponent } from './suprimentos.component';
import { CommonModule } from './common/common.module';

@NgModule({
  declarations: [
    SuprimentosComponent
  ],
  imports: [
    SuprimentosRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class SuprimentosModule { }
