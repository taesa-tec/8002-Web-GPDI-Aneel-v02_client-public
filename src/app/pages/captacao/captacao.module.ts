import {NgModule} from '@angular/core';

import {CaptacaoRoutingModule} from './captacao-routing.module';
import {CaptacaoComponent} from '@app/pages/captacao/captacao.component';
import {ListComponent} from '@app/pages/captacao/list/list.component';
import {CriarComponent} from '@app/pages/captacao/criar/criar.component';
import {EnviarComponent} from '@app/pages/captacao/enviar/enviar.component';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {CaptacoesResolver} from '@app/resolvers/captacoes.resolver';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {DashboardModule} from '@app/dashboard';


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
        CaptacaoRoutingModule,
        DashboardModule
    ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class CaptacaoModule {
}
