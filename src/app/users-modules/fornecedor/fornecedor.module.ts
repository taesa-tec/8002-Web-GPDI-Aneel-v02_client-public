import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {PropostaResolver} from '@app/users-modules/fornecedor/resolvers/proposta.resolver';
import {PropostasResolver} from '@app/users-modules/fornecedor/resolvers/propostas.resolver';
import {PropostasService} from '@app/users-modules/fornecedor/services/propostas.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {COMPONENT_LABELS} from '@app/core/shared';
import {Texts} from '@app/users-modules/fornecedor/texts';
import {HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, SidebarMenu} from '@app/users-modules/fornecedor/menus';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    FornecedorRoutingModule
  ],
  providers: [
    PropostaResolver,
    PropostasResolver,
    PropostasService,
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
      useValue: true
    },
    {
      provide: COMPONENT_LABELS,
      useValue: Texts
    }
  ]
})
export class FornecedorModule {
}
