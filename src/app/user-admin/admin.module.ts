import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/propostas/proposta/shared';


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
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: `/demandas`},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/captacoes`},
        {text: 'Projetos - Priorização e Seleção', icon: 'ta-file-check', path: `/selecao`},
        {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/refinamento`},
        {text: 'Projetos - Identificação e medição de riscos ', icon: 'ta-file-check', path: `/identificacao-riscos`},
        {text: 'Projetos - Aprovação e Formalização ', icon: 'ta-file-check', path: `/formalizacao`},
        {text: 'Projetos - Em execução', icon: 'ta-file-check', path: `/projetos/em-execucao`},
        {text: 'Projetos - Em finalização', icon: 'ta-file-check', path: `/projetos/em-finalizacao`},
        {text: 'Configurações do Sistema', icon: 'ta-gear', path: `/configuracoes`},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Gerenciar Usuários', icon: 'ta-group', path: `/gerenciar-usuarios`},
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: ``
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: false
    },
  ]
})
export class AdminModule {
}
