import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasResolver} from '@app/user-fornecedor/resolvers/propostas.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';


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
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/fornecedor/propostas'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/fornecedor/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/fornecedor'
    }
  ]
})
export class FornecedorModule {
}
