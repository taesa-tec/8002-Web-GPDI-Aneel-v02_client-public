import {NgModule} from '@angular/core';
import {PropostaRoutingModule} from './proposta-routing.module';
import {PropostaResolver} from '@app/proposta/resolvers/proposta.resolver';
import {PropostasService} from './services/propostas.service';
import {CoreModule} from '@app/core';
import {PropostaComponent} from './proposta.component';
import {DashboardModule} from '@app/dashboard';
import {PropostasResolver} from '@app/proposta/resolvers/propostas.resolver';
import {PropostaProvider} from '@app/proposta/shared';


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
  ],
})
export class PropostaModule {
}
