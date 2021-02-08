import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {DashboardModule} from '@app/dashboard';
import {CondicoesComponent} from '@app/user-fornecedor/propostas/proposta/02-condicoes/condicoes.component';
import {CondicoesRoutingModule} from '@app/user-fornecedor/propostas/proposta/02-condicoes/condicoes-routing.module';
import {CondicoesResolver} from '@app/user-fornecedor/resolvers/condicoes.resolver';

@NgModule({
  declarations: [CondicoesComponent],
  providers: [CondicoesResolver],
  imports: [
    CoreModule,
    DashboardModule,
    CondicoesRoutingModule
  ]
})
export class CondicoesModule {
}
