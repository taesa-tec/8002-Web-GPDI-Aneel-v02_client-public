import {NgModule} from '@angular/core';

import {CaptacoesRoutingModule} from './captacoes-routing.module';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {CaptacoesResolver} from '@app/resolvers/captacoes.resolver';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {CaptacoesComponent} from '@app/user-suprimento/captacoes/captacoes.component';


@NgModule({
  declarations: [
    CaptacoesComponent,
    CaptacoesComponent,
  ],
  imports: [
    SharedModule,
    DirectivesModule,
    CaptacoesRoutingModule
  ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class CaptacoesModule {
}
