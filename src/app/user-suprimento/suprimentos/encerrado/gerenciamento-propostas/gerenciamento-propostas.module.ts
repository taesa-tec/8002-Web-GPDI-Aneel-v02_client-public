import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { GerenciamentoPropostasRoutingModule } from './gerenciamento-propostas-routing.module';
import { GerenciamentoPropostasComponent } from './gerenciamento-propostas.component';
import { PropostasListComponent } from './propostas-list/propostas-list.component';
import { PropostaDetalhesComponent } from './proposta-detalhes/proposta-detalhes.component';


@NgModule({
  declarations: [
    GerenciamentoPropostasComponent,
    PropostasListComponent,
    PropostaDetalhesComponent
  ],
  imports: [
    SharedModule,
    GerenciamentoPropostasRoutingModule
  ]
})
export class GerenciamentoPropostasModule { }
