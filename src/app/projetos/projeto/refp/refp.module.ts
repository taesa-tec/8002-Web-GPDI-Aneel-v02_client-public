import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefpRoutingModule } from './refp-routing.module';
import { NovoComponent } from './novo/novo.component';
import {DashboardModule} from '@app/dashboard';
import { RecursoHumanoComponent } from './novo/recurso-humano.component';
import { RecursoMaterialComponent } from './novo/recurso-material.component';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [NovoComponent, RecursoHumanoComponent, RecursoMaterialComponent],
  imports: [
    CommonModule,
    RefpRoutingModule,
    DashboardModule,
    CoreModule
  ]
})
export class RefpModule { }
