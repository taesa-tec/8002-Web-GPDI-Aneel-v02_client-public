import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasIdentificacaoRiscosRoutingModule} from './propostas-identificacao-riscos-routing.module';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {CoreModule} from '@app/core';
import {CaptacoesResolver} from '@app/resolvers';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';

import {HomeComponent} from './home/home.component';
import {RiscosComponent} from './riscos/riscos.component';
import {DetalhesComponent} from './proposta-detalhes/detalhes.component';
import {ListComponent} from './list/list.component';


@NgModule({
  declarations: [HomeComponent, RiscosComponent, DetalhesComponent, ListComponent],
  imports: [
    CommonModule,
    PropostasIdentificacaoRiscosRoutingModule,
    DirectivesModule,
    CoreModule
  ],
  providers: [
    EquipePedResolver,
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class PropostasIdentificacaoRiscosModule {
}
