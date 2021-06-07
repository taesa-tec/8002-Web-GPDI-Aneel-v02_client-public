import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AprovadorComponent} from './aprovador/aprovador.component';
import {RecursoHumanoComponent} from './aprovador/recurso-humano.component';
import {CoreModule} from '@app/core';
import { RecursoMaterialComponent } from './aprovador/recurso-material.component';


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
