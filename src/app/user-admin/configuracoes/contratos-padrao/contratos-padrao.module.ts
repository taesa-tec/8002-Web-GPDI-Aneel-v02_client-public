import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContratosPadraoRoutingModule} from './contratos-padrao-routing.module';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ContratosPadraoComponent} from '@app/user-admin/configuracoes/contratos-padrao/contratos-padrao.component';
import {ContratoPadraoFormComponent} from '@app/user-admin/configuracoes/contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {ContratosPadroesResolver} from '@app/resolvers/contratos-padroes.resolver';
import {ContratoPadraoResolver} from '@app/resolvers/contrato-padrao.resolver';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [
    ContratosPadraoComponent,
    ContratoPadraoFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ContratosPadraoRoutingModule
  ],
  providers: [
    ContratosPadroesResolver,
    ContratoPadraoResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/Contratos')}
  ]
})
export class ContratosPadraoModule {
}
