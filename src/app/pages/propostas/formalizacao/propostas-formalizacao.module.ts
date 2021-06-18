import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home/home.component';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {CoreModule} from '@app/core';
import {CaptacoesResolver} from '@app/resolvers';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';
import {FormalizacaoComponent} from './formalizacao/formalizacao.component';
import {FormalizacaoDetalhesComponent} from './formalizacao-detalhes/formalizacao-detalhes.component';
import {ListComponent} from './list/list.component';
import {PropostasFormalizacaoRoutingModule} from './propostas-formalizacao-routing.module';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';


@NgModule({
  declarations: [HomeComponent, FormalizacaoComponent, FormalizacaoDetalhesComponent, ListComponent],
  imports: [
    CommonModule,
    PropostasFormalizacaoRoutingModule,
    DirectivesModule,
    CoreModule
  ],
  providers: [
    EquipePedResolver,
    CaptacoesResolver,
    EmpresasResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class PropostasFormalizacaoModule {
}
