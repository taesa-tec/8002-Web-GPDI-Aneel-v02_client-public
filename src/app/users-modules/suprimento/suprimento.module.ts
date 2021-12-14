import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuprimentoRoutingModule} from './suprimento-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {CaptacoesService} from '@app/users-modules/suprimento/services/captacoes.service';
import {CaptacaoResolver} from '@app/users-modules/suprimento/resolvers/captacao.resolver';
import {CaptacoesResolver} from '@app/users-modules/suprimento/resolvers/captacoes.resolver';


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
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/captacoes'},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro'}
      ]
    }, {
      provide: ROOT_URL,
      useValue: `/`
    }
  ]
})
export class SuprimentoModule {
}
