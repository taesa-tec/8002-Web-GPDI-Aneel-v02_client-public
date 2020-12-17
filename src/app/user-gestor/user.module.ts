import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    UserRoutingModule
  ],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: '/gestor/demandas'},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/gestor/captacao'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/gestor'
    }
  ]
})
export class UserModule {
}
