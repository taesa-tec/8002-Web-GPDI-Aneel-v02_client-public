import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {ConfiguracoesSistemaRoutingModule} from './configuracoes-sistema-routing.module';
import {PadraoFormulariosComponent} from './padrao-formularios/padrao-formularios.component';
import {EquipeComponent} from './equipe/equipe.component';
import {ConfiguracoesSistemaComponent} from './configuracoes-sistema.component';
import {FormEditorComponent} from '@app/dashboard/configuracoes-sistema/form-editor/form-editor.component';
import { ContratosPadraoComponent } from './contratos-padrao/contratos-padrao.component';
import { ContratoBaseComponent } from './contrato-base/contrato-base.component';
import { ContratoPadraoFormComponent } from './contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FornecedorFormComponent } from './fornecedores/fornecedor-form/fornecedor-form.component';


@NgModule({
  declarations: [
    ConfiguracoesSistemaComponent,
    EquipeComponent,
    PadraoFormulariosComponent,
    FormEditorComponent,
    ContratosPadraoComponent,
    ContratoBaseComponent,
    ContratoPadraoFormComponent,
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
