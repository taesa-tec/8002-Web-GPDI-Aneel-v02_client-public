import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasRoutingModule} from './propostas-routing.module';
import {SharedModule} from '@app/dashboard/shared';
import {PropostasListComponent} from '@app/users-modules/fornecedor/propostas/propostas-list.component';
import {PropostaResolver} from '@app/users-modules/fornecedor/resolvers/proposta.resolver';
import {PropostasService} from '@app/users-modules/fornecedor/services/propostas.service';
import {PropostasComponent} from '@app/users-modules/fornecedor/propostas/propostas.component';
import {PropostaDetalhesComponent} from '@app/users-modules/fornecedor/propostas/proposta-detalhes.component';


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
