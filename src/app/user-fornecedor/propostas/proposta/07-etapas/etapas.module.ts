import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { EtapasRoutingModule } from './etapas-routing.module';
import { EtapasComponent } from './etapas.component';
import { EtapaFormComponent } from './etapa-form/etapa-form.component';


@NgModule({
  declarations: [EtapasComponent, EtapaFormComponent],
  imports: [
    SharedModule,
    EtapasRoutingModule
  ]
})
export class EtapasModule { }
