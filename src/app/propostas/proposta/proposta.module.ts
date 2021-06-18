import {NgModule} from '@angular/core';
import {PropostaRoutingModule} from './proposta-routing.module';
import {PropostaResolver} from '@app/propostas/proposta/resolvers/proposta.resolver';
import {PropostasService} from './services/propostas.service';
import {CoreModule} from '@app/core';
import {PropostaComponent} from './proposta.component';
import {DashboardModule} from '@app/dashboard';
import {PropostasResolver} from '@app/propostas/proposta/resolvers/propostas.resolver';
import {PropostaProvider} from '@app/propostas/proposta/shared';
import {ContratoService} from '@app/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [PropostaComponent],
  imports: [
    CoreModule,
    DashboardModule,
    PropostaRoutingModule
  ],
  providers: [
    PropostasService,
    PropostaProvider,
    PropostasResolver,
    PropostaResolver,
    ContratoService,
  ],

})
export class PropostaModule {
}
