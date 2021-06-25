import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApoioRoutingModule } from './apoio-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    ApoioRoutingModule,
    CoreModule
  ]
})
export class ApoioModule { }
