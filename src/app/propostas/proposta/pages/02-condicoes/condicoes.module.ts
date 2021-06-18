import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {DashboardModule} from '@app/dashboard';
import {ModalComponent} from './modal/modal.component';
import {CondicoesComponent} from '@app/propostas/proposta/pages/02-condicoes/condicoes.component';
import {CondicoesResolver} from '@app/propostas/proposta/resolvers';
import {CondicoesRoutingModule} from '@app/propostas/proposta/pages/02-condicoes/condicoes-routing.module';

@NgModule({
  declarations: [CondicoesComponent, ModalComponent],
  providers: [CondicoesResolver],
  imports: [
    CoreModule,
    DashboardModule,
    CondicoesRoutingModule
  ]
})
export class CondicoesModule {
}
