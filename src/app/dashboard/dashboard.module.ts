import {NgModule} from '@angular/core';

import {UsersModule} from '@app/dashboard/users/users.module';
import {HeaderComponent, SharedModule} from '@app/dashboard/shared';

import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard.component';
import {UsersService} from '@app/services/users.service';
import {IndexComponent} from './index/index.component';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {TopnavComponent} from '@app/dashboard/topnav/topnav.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopnavComponent,
    HeaderComponent,
    NotFoundComponent,
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
    TopnavComponent,
    NotFoundComponent,
  ],
  providers: [
    UsersService
  ]
})
export class DashboardModule {
}
