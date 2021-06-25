import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasRoutingModule } from './etapas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    EtapasRoutingModule,
    CoreModule
  ]
})
export class EtapasModule { }
