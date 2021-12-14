import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColaboradorRoutingModule} from './colaborador-routing.module';
import {HeaderMenu, SidebarMenu} from '@app/users-modules/colaborador/menus';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ColaboradorRoutingModule
  ],
  providers: [
    SidebarMenu, HeaderMenu
  ]
})
export class ColaboradorModule {
}
