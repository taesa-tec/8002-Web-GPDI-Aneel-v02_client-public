import {NgModule} from '@angular/core';
import {PropostaRoutingModule} from './proposta-routing.module';
import {DevelopmentComponent} from '@app/user-fornecedor/propostas/proposta/development/development.component';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {CoreModule} from '@app/core';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {DashboardModule} from '@app/dashboard';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';


@NgModule({
  declarations: [DevelopmentComponent, PropostaComponent],
  imports: [
    CoreModule,
    DashboardModule,
    PropostaRoutingModule
  ],
  providers: [
    PropostasService,
    PropostaResolver
  ],
})
export class PropostaModule {
}
