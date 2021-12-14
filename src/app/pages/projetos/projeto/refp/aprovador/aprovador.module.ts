import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {CommonModule} from '@angular/common';
import {AprovadorComponent} from './aprovador.component';
import {RecursoHumanoComponent} from './recurso-humano.component';
import {RecursoMaterialComponent} from './recurso-material.component';


@NgModule({
  declarations: [AprovadorComponent, RecursoHumanoComponent, RecursoMaterialComponent],
  exports: [AprovadorComponent],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class AprovadorModule {
}
