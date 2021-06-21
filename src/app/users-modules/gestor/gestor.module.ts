import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestorRoutingModule} from './gestor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {ROOT_URL} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, SidebarMenu} from './menus';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    GestorRoutingModule
  ],
  providers: [
    SidebarMenu, HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, {
      provide: ROOT_URL,
      useValue: ``
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: false
    },
  ],

})
export class GestorModule {
}
