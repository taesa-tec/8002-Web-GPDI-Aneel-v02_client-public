import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { RecursosHumanosComponent } from './recursos-humanos.component';
import { RecursoHumanoFormComponent } from './recurso-humano-form/recurso-humano-form.component';


@NgModule({
  declarations: [
    RecursosHumanosComponent, 
    RecursoHumanoFormComponent
  ],
  imports: [
    SharedModule,
    RecursosHumanosRoutingModule
  ]
})
export class RecursosHumanosModule { }
