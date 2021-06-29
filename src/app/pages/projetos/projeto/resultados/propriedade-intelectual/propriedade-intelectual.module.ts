import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriedadeIntelectualRoutingModule } from './propriedade-intelectual-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';
import { MultiSelectModule } from '@app/core/components/forms/multi-select/multi-select.module';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    PropriedadeIntelectualRoutingModule,
    CoreModule,
    MultiSelectModule
  ]
})
export class PropriedadeIntelectualModule { }
