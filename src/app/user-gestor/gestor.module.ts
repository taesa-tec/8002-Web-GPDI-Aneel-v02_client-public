import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestorRoutingModule} from './gestor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {CurrentUseProvider} from '@app/user-shared/providers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    GestorRoutingModule
  ],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: '/gestor/demandas'},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/gestor/captacoes'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/gestor/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/gestor'
    },
    CurrentUseProvider
  ],

})
export class GestorModule {
}
