import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasRoutingModule} from './propostas-routing.module';
import {SharedModule} from '@app/dashboard/shared';
import {PropostasComponent} from '@app/user-fornecedor/propostas/propostas.component';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {CAPTACAO_ID} from '@app/user-fornecedor/propostas/proposta/shared';
import {ActivatedRoute} from '@angular/router';


@NgModule({
  declarations: [PropostasComponent],
  imports: [
    CommonModule,
    SharedModule,
    PropostasRoutingModule
  ],
  providers: [PropostasService, PropostaResolver]

})
export class PropostasModule {
}
