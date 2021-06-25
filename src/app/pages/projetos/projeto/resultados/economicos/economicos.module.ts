import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicosRoutingModule } from './economicos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    EconomicosRoutingModule,
    CoreModule
  ]
})
export class EconomicosModule { }
