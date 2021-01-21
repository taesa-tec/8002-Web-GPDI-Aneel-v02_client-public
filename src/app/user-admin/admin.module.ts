import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {CURRENT_USER, HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {AuthService} from '@app/services';


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
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/admin/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/admin'
    },
    {
      provide: CURRENT_USER,
      deps: [AuthService],
      useFactory: (auth: AuthService) => auth.user
    }
  ]
})
export class AdminModule {
}
