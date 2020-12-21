import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU, UserRole} from '@app/commons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    AdminRoutingModule
  ],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: '/admin/demandas'},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/admin/captacoes'},
        {text: 'Configurações do Sistema', icon: 'ta-gear', path: '/admin/configuracoes'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Gerenciar Usuários', icon: 'ta-group', path: '/admin/gerenciar-usuarios'},
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/admin'
    }
  ]
})
export class AdminModule {
}
