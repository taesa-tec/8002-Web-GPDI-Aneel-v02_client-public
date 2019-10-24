
import { ConfiguracoesSistemaRoutingModule } from './configuracoes-sistema-routing.module';
import { EditarFormulariosComponent } from './padrao-formularios/editar-formularios/editar-formularios.component';
import { PadraoFormulariosComponent } from './padrao-formularios/padrao-formularios.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ConfiguracoesSistemaComponent } from './configuracoes-sistema.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormFieldComponent } from './padrao-formularios/form-field/form-field.component';
import { FormEditorComponent } from './padrao-formularios/form-editor/form-editor.component';
import { FormFieldControlComponent } from './padrao-formularios/form-field/form-field-control.component';


@NgModule({
  declarations: [
    ConfiguracoesSistemaComponent,
    EquipeComponent,
    PadraoFormulariosComponent,
    EditarFormulariosComponent,
    FormFieldComponent,
    FormEditorComponent,
    FormFieldControlComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesSistemaRoutingModule,
    SharedModule,
  ]
})
export class ConfiguracoesSistemaModule { }
