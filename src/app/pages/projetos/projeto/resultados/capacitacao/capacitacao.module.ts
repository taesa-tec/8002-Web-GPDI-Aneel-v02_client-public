import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacitacaoRoutingModule } from './capacitacao-routing.module';
import { EditorComponent } from './editor/editor.component';
import { ListaComponent } from './lista/lista.component';
import { CoreModule } from '@app/core';


@NgModule({
  declarations: [EditorComponent, ListaComponent],
  imports: [
    CommonModule,
    CapacitacaoRoutingModule,
    CoreModule
  ]
})
export class CapacitacaoModule { }
