import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostaRoutingModule} from './proposta-routing.module';
import {DevelopmentComponent} from '@app/user-fornecedor/propostas/proposta/development/development.component';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {CoreModule} from '@app/core';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {DashboardModule} from '@app/dashboard';


@NgModule({
  declarations: [DevelopmentComponent, PropostaComponent],
  providers: [PropostasService, PropostaResolver],
  imports: [
    CoreModule,
    DashboardModule,
    PropostaRoutingModule
  ]
})
export class PropostaModule {
}
