import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {ROOT_URL} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, SidebarMenu} from './menus';
import {PropostaTextsProvider} from '@app/users-modules/shared/texts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    AdminRoutingModule
  ],
  providers: [
    SidebarMenu,
    HeaderMenu,
    ProjetoExecucaoMenu,
    ProjetoFinalizadoMenu,
    {
      provide: ROOT_URL,
      useValue: ``
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: false
    },
    PropostaTextsProvider
  ]
})
export class AdminModule {
}
