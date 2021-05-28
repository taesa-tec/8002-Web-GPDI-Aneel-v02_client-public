import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {AdminRootUrl} from '@app/routes/routes';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';


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
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: `/${AdminRootUrl}/demandas`},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/${AdminRootUrl}/captacoes`},
        {text: 'Projetos - Priorização e Seleção', icon: 'ta-file-check', path: `/${AdminRootUrl}/selecao`},
        {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/${AdminRootUrl}/refinamento`},
        {text: 'Projetos - Identificação e medição de riscos ', icon: 'ta-file-check', path: `/${AdminRootUrl}/identificacao-riscos`},
        {text: 'Projetos - Aprovação e Formalização ', icon: 'ta-file-check', path: `/${AdminRootUrl}/formalizacao`},
        {text: 'Projetos - Em execução', icon: 'ta-file-check', path: `/${AdminRootUrl}/projetos/em-execucao`},
        {text: 'Projetos - Em finalizados', icon: 'ta-file-check', path: `/${AdminRootUrl}/projetos/em-finalizacao`},
        {text: 'Configurações do Sistema', icon: 'ta-gear', path: `/${AdminRootUrl}/configuracoes`},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Gerenciar Usuários', icon: 'ta-group', path: `/${AdminRootUrl}/gerenciar-usuarios`},
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/${AdminRootUrl}/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: `/${AdminRootUrl}`
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: false
    },
  ]
})
export class AdminModule {
}
