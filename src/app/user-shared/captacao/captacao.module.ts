import {NgModule} from '@angular/core';

import {CaptacaoRoutingModule} from './captacao-routing.module';
import {CaptacaoComponent} from '@app/user-shared/captacao/captacao.component';
import {ListComponent} from '@app/user-shared/captacao/list/list.component';
import {CriarComponent} from '@app/user-shared/captacao/criar/criar.component';
import {EnviarComponent} from '@app/user-shared/captacao/enviar/enviar.component';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {CaptacoesResolver} from '@app/resolvers/captacoes.resolver';
import {DirectivesModule} from '@app/dashboard/shared/directives';


@NgModule({
  declarations: [
    CaptacaoComponent,
    CriarComponent,
    EnviarComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
    DirectivesModule,
    CaptacaoRoutingModule
  ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class CaptacaoModule {
}
