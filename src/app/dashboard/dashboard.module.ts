import {NgModule} from '@angular/core';

import {UsersModule} from '@app/dashboard/users/users.module';
import {HeaderComponent, SharedModule} from '@app/dashboard/shared';

import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {DashboardComponent} from './dashboard.component';
import {UsersService} from '@app/services/users.service';
import {IndexComponent} from './index/index.component';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,
    IndexComponent,
  ],
  imports: [
    SharedModule,
    UsersModule,
    // DashboardRoutingModule,
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule {
}
