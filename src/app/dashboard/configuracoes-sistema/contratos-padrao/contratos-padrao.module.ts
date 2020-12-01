import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContratosPadraoRoutingModule} from './contratos-padrao-routing.module';
import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ContratosPadraoComponent} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contratos-padrao.component';
import {ContratoPadraoFormComponent} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {ContratosPadraoResolver} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contratos-padrao.resolver';
import {ContratoPadraoResolver} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contrato-padrao.resolver';


@NgModule({
  declarations: [
    ContratosPadraoComponent,
    ContratoPadraoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContratosPadraoRoutingModule
  ],
  providers: [
    ContratosPadraoResolver,
    ContratoPadraoResolver,
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/Contratos')}
  ]
})
export class ContratosPadraoModule {
}
