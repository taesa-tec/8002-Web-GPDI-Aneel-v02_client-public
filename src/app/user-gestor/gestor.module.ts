import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestorRoutingModule} from './gestor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {GestorRootUrl} from '@app/routes/routes';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';


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
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: `/${GestorRootUrl}/demandas`},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/${GestorRootUrl}/captacoes`},
        {text: 'Projetos - Priorização e Seleção', icon: 'ta-file-check', path: `/${GestorRootUrl}/selecao`},
        {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/${GestorRootUrl}/refinamento`},
        {text: 'Projetos - Identificação e medição de riscos ', icon: 'ta-file-check', path: `/${GestorRootUrl}/identificacao-riscos`},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/${GestorRootUrl}/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: `/${GestorRootUrl}`
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: false
    },
  ],

})
export class GestorModule {
}
