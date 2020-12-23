import {NgModule} from '@angular/core';

import {UsersModule} from '@app/dashboard/users/users.module';
import {HeaderComponent, SharedModule} from '@app/dashboard/shared';

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
    NotFoundComponent,
    GerenciarUsuariosComponent,
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule {
}
