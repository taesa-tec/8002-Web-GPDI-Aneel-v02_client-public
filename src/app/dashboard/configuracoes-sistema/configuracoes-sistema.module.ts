
import { ConfiguracoesSistemaRoutingModule } from './configuracoes-sistema-routing.module';
import { EditarFormulariosComponent } from './padrao-formularios/editar-formularios/editar-formularios.component';
import { PadraoFormulariosComponent } from './padrao-formularios/padrao-formularios.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ConfiguracoesSistemaComponent } from './configuracoes-sistema.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


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
  ]
})
export class ConfiguracoesSistemaModule { }
