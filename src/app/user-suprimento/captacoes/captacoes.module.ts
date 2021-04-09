import {NgModule} from '@angular/core';

import {CaptacoesRoutingModule} from './captacoes-routing.module';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {CaptacoesResolver} from '@app/resolvers/captacoes.resolver';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {CaptacoesComponent} from '@app/user-suprimento/captacoes/captacoes.component';
import {TOPNAV_MENU} from '@app/commons';
import {SuprimentoRootUrl} from '@app/routes/routes';
import {DashboardModule} from '@app/dashboard';
import {ListComponent} from './list.component';


@NgModule({
  declarations: [
    CaptacoesComponent,
    CaptacoesComponent,
    ListComponent,
  ],
  imports: [
    SharedModule,
    DirectivesModule,
    CaptacoesRoutingModule,
    DashboardModule
  ],
  providers: [
    CaptacoesResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes')},
    {
      provide: TOPNAV_MENU,
      useValue: [
        {text: 'Pendentes', path: `/${SuprimentoRootUrl}/captacoes/pendentes`},
        {text: 'Abertas', path: `/${SuprimentoRootUrl}/captacoes/abertas`},
        {text: 'Finalizadas', path: `/${SuprimentoRootUrl}/captacoes/finalizadas`},
        {text: 'Canceladas', path: `/${SuprimentoRootUrl}/captacoes/canceladas`},
      ]
    }
  ]
})
export class CaptacoesModule {
}
