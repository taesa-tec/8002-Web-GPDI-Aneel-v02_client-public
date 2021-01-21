import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuprimentoRoutingModule} from './suprimento-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';
import {CaptacaoResolver} from '@app/user-suprimento/resolvers/captacao.resolver';
import {CaptacoesResolver} from '@app/user-suprimento/resolvers/captacoes.resolver';
import {AuthService} from '@app/services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    SuprimentoRoutingModule
  ],
  providers: [
    CaptacoesService,
    CaptacaoResolver,
    CaptacoesResolver,
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/suprimento/captacoes'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/suprimento/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: '/suprimento'
    }
  ]
})
export class SuprimentoModule {
}
