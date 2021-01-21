import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {CURRENT_USER, HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasResolver} from '@app/user-fornecedor/resolvers/propostas.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {AuthService} from '@app/services';


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
    },
    {
      provide: CURRENT_USER,
      deps: [AuthService],
      useFactory: (auth: AuthService) => auth.user
    }
  ]
})
export class FornecedorModule {
}
