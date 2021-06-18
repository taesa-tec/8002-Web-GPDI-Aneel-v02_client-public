import {NgModule} from '@angular/core';

import {UsersModule} from '@app/pages/gerenciar-usuarios/users/users.module';
import {HeaderComponent, SharedModule} from '@app/dashboard/shared';

import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard.component';
import {UsersService} from '@app/services/users.service';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {TopnavComponent} from '@app/dashboard/topnav/topnav.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopnavComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TopnavComponent,
    NotFoundComponent,
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule {
}
