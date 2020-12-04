import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {ClausulasComponent} from './clausulas.component';
import {ClausulasRoutingModule} from '@app/dashboard/configuracoes-sistema/clausulas/clausulas-routing.module';
import {ClausulasResolver} from '@app/dashboard/configuracoes-sistema/clausulas/clausulas.resolver';


@NgModule({
  declarations: [
    ClausulasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClausulasRoutingModule
  ],
  providers: [
    ClausulasResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/Clausulas')}
  ]
})
export class ClausulasModule {
}
