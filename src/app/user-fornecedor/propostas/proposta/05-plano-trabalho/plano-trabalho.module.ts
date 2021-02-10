import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared/shared.module';

import { PlanoTrabalhoRoutingModule } from './plano-trabalho-routing.module';
import { PlanoTrabalhoComponent } from './plano-trabalho.component';


@NgModule({
  declarations: [PlanoTrabalhoComponent],
  imports: [
    SharedModule,
    PlanoTrabalhoRoutingModule
  ]
})
export class PlanoTrabalhoModule { }
