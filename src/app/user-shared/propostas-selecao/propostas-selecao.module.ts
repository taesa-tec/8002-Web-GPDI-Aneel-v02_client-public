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
import {CaptacoesResolver} from '@app/resolvers';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {ListComponent} from '@app/user-shared/propostas-selecao/list/list.component';


@NgModule({
  declarations: [HomeComponent, PendenteComponent, FinalizadaComponent, SelecaoComponent, PropostaDetalhesComponent, ListComponent],
  imports: [
    CommonModule,
    PropostasSelecaoRoutingModule,
    DirectivesModule,
    CoreModule
  ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class PropostasSelecaoModule {
}
