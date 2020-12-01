import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {ConfiguracoesSistemaRoutingModule} from './configuracoes-sistema-routing.module';
import {PadraoFormulariosComponent} from './padrao-formularios/padrao-formularios.component';
import {EquipeComponent} from './equipe/equipe.component';
import {ConfiguracoesSistemaComponent} from './configuracoes-sistema.component';
import {FormEditorComponent} from '@app/dashboard/configuracoes-sistema/form-editor/form-editor.component';
import {ContratoBaseComponent} from './contrato-base/contrato-base.component';
import {FornecedoresComponent} from './fornecedores/fornecedores.component';
import {FornecedorFormComponent} from './fornecedores/fornecedor-form/fornecedor-form.component';


@NgModule({
  declarations: [
    ConfiguracoesSistemaComponent,
    EquipeComponent,
    PadraoFormulariosComponent,
    FormEditorComponent,
    ContratoBaseComponent,
    FornecedoresComponent,
    FornecedorFormComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesSistemaRoutingModule,
    SharedModule,
  ]
})
export class ConfiguracoesSistemaModule {
}
