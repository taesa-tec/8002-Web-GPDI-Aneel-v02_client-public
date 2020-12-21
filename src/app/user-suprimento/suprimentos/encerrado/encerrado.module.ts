import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';

import { EncerradoRoutingModule } from './encerrado-routing.module';
import { GerenciamentoPropostasRoutingModule } from './gerenciamento-propostas/gerenciamento-propostas-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EncerradoRoutingModule,
    GerenciamentoPropostasRoutingModule
  ]
})
export class EncerradoModule { }
