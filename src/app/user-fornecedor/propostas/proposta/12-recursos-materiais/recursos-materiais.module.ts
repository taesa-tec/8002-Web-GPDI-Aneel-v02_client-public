import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { RecursosMateriaisRoutingModule } from './recursos-materiais-routing.module';
import { RecursosMateriaisComponent } from './recursos-materiais.component';
import { RecursoMaterialFormComponent } from './recurso-material-form/recurso-material-form.component';

@NgModule({
  declarations: [
    RecursosMateriaisComponent,
    RecursoMaterialFormComponent
  ],
  imports: [
    SharedModule,
    RecursosMateriaisRoutingModule
  ]
})
export class RecursosMateriaisModule { }
