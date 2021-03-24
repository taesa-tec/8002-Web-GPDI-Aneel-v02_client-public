import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GestorRoutingModule} from './gestor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {GestorRootUrl} from '@app/routes/routes';


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
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/${GestorRootUrl}/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: `/${GestorRootUrl}`
    }
  ],

})
export class GestorModule {
}
