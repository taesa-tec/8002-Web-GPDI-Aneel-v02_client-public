import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasRoutingModule} from './propostas-routing.module';
import {SharedModule} from '@app/dashboard/shared';
import {PropostasListComponent} from '@app/user-fornecedor/propostas/propostas-list.component';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PropostasComponent} from '@app/user-fornecedor/propostas/propostas.component';
import {PropostaDetalhesComponent} from '@app/user-fornecedor/propostas/proposta-detalhes.component';


@NgModule({
  declarations: [PropostasListComponent, PropostasComponent, PropostaDetalhesComponent],
  imports: [
    CommonModule,
    SharedModule,
    PropostasRoutingModule
  ],
  providers: [PropostasService, PropostaResolver]

})
export class PropostasModule {
}
