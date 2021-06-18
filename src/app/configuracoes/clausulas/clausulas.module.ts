import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {ClausulasComponent} from './clausulas.component';
import {ClausulasRoutingModule} from '@app/configuracoes/clausulas/clausulas-routing.module';
import {ClausulasResolver} from '@app/configuracoes/clausulas/clausulas.resolver';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [
    ClausulasComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ClausulasRoutingModule
  ],
  providers: [
    ClausulasResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/Clausulas')}
  ]
})
export class ClausulasModule {
}
