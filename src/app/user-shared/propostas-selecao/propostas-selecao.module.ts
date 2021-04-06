import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasSelecaoRoutingModule} from './propostas-selecao-routing.module';
import {HomeComponent} from './home/home.component';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {PendenteComponent} from './pendente/pendente.component';
import {FinalizadaComponent} from './finalizada/finalizada.component';
import {CoreModule} from '@app/core';
import {SelecaoComponent} from './selecao/selecao.component';
import {PropostaDetalhesComponent} from './proposta-detalhes/proposta-detalhes.component';


@NgModule({
  declarations: [HomeComponent, PendenteComponent, FinalizadaComponent, SelecaoComponent, PropostaDetalhesComponent],
  imports: [
    CommonModule,
    PropostasSelecaoRoutingModule,
    DirectivesModule,
    CoreModule
  ]
})
export class PropostasSelecaoModule {
}
