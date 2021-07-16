import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministrativoRoutingModule} from './administrativo-routing.module';
import {AdministrativoComponent} from './administrativo.component';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {DashboardModule} from '@app/dashboard';
import {ScreensModule} from '@app/core/screens/screens.module';
import {LogsDutoComponent} from './logs-duto/logs-duto.component';
import {ProjetoNodeResolver} from '@app/pages/projetos/projeto/resolvers/projeto.resolver';
import {ComponentsModule} from '@app/core/components';
import {RepositorioXmlComponent} from './repositorio-xml/repositorio-xml.component';
import {AlterarSatusComponent} from './alterar-satus/alterar-satus.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeradorXmlComponent} from './gerador-xml/gerador-xml.component';


@NgModule({
  declarations: [AdministrativoComponent, LogsDutoComponent, RepositorioXmlComponent, AlterarSatusComponent, GeradorXmlComponent],
  imports: [
    CommonModule,
    DashboardModule,
    ScreensModule,
    AdministrativoRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProjetoNodeResolver.Node('LogsDuto', 'projetoLogsDuto'),
    ProjetoNodeResolver.Node('Xmls', 'projetoXmls'),
  ]
})
export class AdministrativoModule {
}
