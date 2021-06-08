import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetalhesComponent} from './detalhes.component';
import {RecursoHumanoComponent} from './recurso-humano.component';
import {RecursoMaterialComponent} from './recurso-material.component';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [DetalhesComponent, RecursoHumanoComponent, RecursoMaterialComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [DetalhesComponent]
})
export class DetalhesModule {
}
