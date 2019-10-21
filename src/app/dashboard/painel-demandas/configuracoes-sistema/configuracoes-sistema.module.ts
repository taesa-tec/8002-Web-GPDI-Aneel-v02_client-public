import { CKEditorModule } from 'ckeditor4-angular';
import { SharedModule } from './../../../core/shared/shared.module';
import { ConfiguracoesSistemaRoutingModule } from './configuracoes-sistema-routing.module';
import { EditarFormulariosComponent } from './padrao-formularios/editar-formularios/editar-formularios.component';
import { PadraoFormulariosComponent } from './padrao-formularios/padrao-formularios.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ConfiguracoesSistemaComponent } from './configuracoes-sistema.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ConfiguracoesSistemaComponent,
    EquipeComponent,
    PadraoFormulariosComponent,
    EditarFormulariosComponent,

  ],
  imports: [
    CommonModule,
    ConfiguracoesSistemaRoutingModule,
    SharedModule,
    CKEditorModule
  ]
})
export class ConfiguracoesSistemaModule { }
