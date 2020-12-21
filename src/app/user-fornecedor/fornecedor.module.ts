import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    FornecedorRoutingModule
  ],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/fornecedor/captacoes'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/fornecedor'
    }
  ]
})
export class FornecedorModule {
}
