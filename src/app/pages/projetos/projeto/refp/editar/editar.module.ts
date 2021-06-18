import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {CommonModule} from '@angular/common';
import {RecursoHumanoComponent} from './recurso-humano.component';
import {RecursoMaterialComponent} from './recurso-material.component';
import {EditarComponent} from './editar.component';


@NgModule({
  declarations: [EditarComponent, RecursoHumanoComponent, RecursoMaterialComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [EditarComponent]
})
export class EditarModule {
}
