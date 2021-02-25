import {NgModule} from '@angular/core';
import {SharedModule} from '@app/dashboard/shared/shared.module';

import {EscopoRoutingModule} from './escopo-routing.module';
import {EscopoComponent} from './escopo.component';
import {EscopoResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';


@NgModule({
  declarations: [EscopoComponent],
  imports: [
    SharedModule,
    EscopoRoutingModule
  ],
  providers: [
    EscopoResolver
  ]
})
export class EscopoModule {
}
