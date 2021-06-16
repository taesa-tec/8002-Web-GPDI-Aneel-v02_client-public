import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministrativoRoutingModule} from './administrativo-routing.module';
import {AdministrativoComponent} from './administrativo.component';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {DashboardModule} from '@app/dashboard';
import {ScreensModule} from '@app/core/screens/screens.module';
import { LogsDutoComponent } from './logs-duto/logs-duto.component';
import {ProjetoNodeResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';
import {ComponentsModule} from '@app/core/components';

const menu: Array<MenuItem> = [
  {path: 'logs-duto', text: 'Logs DUTO'},
  {path: 'repositorio-xml', text: 'Repositório XMLs Gerados'},
  {path: 'status', text: 'Alteração de Status'},
];

@NgModule({
  declarations: [AdministrativoComponent, LogsDutoComponent],
  imports: [
    CommonModule,
    DashboardModule,
    ScreensModule,
    AdministrativoRoutingModule,
    ComponentsModule
  ],
  providers: [
    {
      provide: TOPNAV_MENU,
      useValue: menu
    },
    ProjetoNodeResolver.Node('LogsDuto', 'projetoLogsDuto'),
  ]
})
export class AdministrativoModule {
}
