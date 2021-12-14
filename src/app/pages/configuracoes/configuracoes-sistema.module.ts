import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../dashboard/shared/shared.module';
import {ConfiguracoesSistemaRoutingModule} from './configuracoes-sistema-routing.module';
import {PadraoFormulariosComponent} from './padrao-formularios/padrao-formularios.component';
import {EquipeComponent} from './equipe/equipe.component';
import {ConfiguracoesSistemaComponent} from './configuracoes-sistema.component';
import {FormEditorComponent} from '@app/pages/configuracoes/form-editor/form-editor.component';


@NgModule({
  declarations: [
    ConfiguracoesSistemaComponent,
    EquipeComponent,
    PadraoFormulariosComponent,
    FormEditorComponent,
  ],
  imports: [
    CommonModule,
    ConfiguracoesSistemaRoutingModule,
    SharedModule,
  ]
})
export class ConfiguracoesSistemaModule {
}
