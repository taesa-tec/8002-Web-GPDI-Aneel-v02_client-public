import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropostasRefinamentoRoutingModule} from './propostas-refinamento-routing.module';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {PropostasRefinamentoResolver} from './propostas-refinamento.resolver';
import {ListComponent} from './list/list.component';
import {ComponentsModule} from '@app/core/components';
import {PROPOSTA_CAN_EDIT} from '@app/propostas/proposta/shared';
import {COMPONENT_LABELS} from '@app/core/shared';
import {Texts} from './text';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PropostasRefinamentoRoutingModule,
    ComponentsModule
  ],
  providers: [
    PropostasRefinamentoResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')},
    {
      provide: COMPONENT_LABELS,
      useValue: Texts
    }
  ]
})
export class PropostasRefinamentoModule {
}
