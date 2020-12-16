import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {UsersModule} from '@app/dashboard/users/users.module';
import {SharedModule} from '@app/dashboard/shared';

import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {DashboardComponent} from './dashboard.component';
import {currentUserProvider} from '@app/providers/user.provider';
import {UsersService} from '@app/services/users.service';
import {AdminGuard} from '@app/dashboard/shared/guards/admin.guard';
import {IndexComponent} from './index/index.component';
import {HasRoleGuard} from '@app/dashboard/shared/guards/has-role.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,
    IndexComponent,
  ],
  imports: [
    SharedModule,
    UsersModule,
    DashboardRoutingModule,
  ],
  providers: [
    UsersService,
    currentUserProvider
  ]
})
export class DashboardModule {
}
