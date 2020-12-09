import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CaptacaoRoutingModule} from './captacao-routing.module';
import {CaptacaoComponent} from '@app/dashboard/captacao/captacao.component';
import {ListComponent} from '@app/dashboard/captacao/list/list.component';
import {CriarComponent} from '@app/dashboard/captacao/criar/criar.component';
import {EnviarComponent} from '@app/dashboard/captacao/enviar/enviar.component';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {CaptacoesResolver} from '@app/dashboard/captacao/captacoes.resolver';


@NgModule({
  declarations: [
    CaptacaoComponent,
    CriarComponent,
    EnviarComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CaptacaoRoutingModule
  ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')}
  ]
})
export class CaptacaoModule {
}
