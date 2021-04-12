import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { GerenciamentoPropostasRoutingModule } from './gerenciamento-propostas-routing.module';
import { GerenciamentoPropostasComponent } from './gerenciamento-propostas.component';
import { PropostasListComponent } from './propostas-list/propostas-list.component';


@NgModule({
  declarations: [
    GerenciamentoPropostasComponent,
    PropostasListComponent
  ],
  imports: [
    SharedModule,
    GerenciamentoPropostasRoutingModule
  ]
})
export class GerenciamentoPropostasModule { }
