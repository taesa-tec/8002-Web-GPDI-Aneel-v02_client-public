import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {UsersModule} from '@app/users/users.module';
import {SharedModule} from '@app/dashboard/shared';

import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {DashboardComponent} from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,
  ],
  imports: [
    SharedModule,
    UsersModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule {
}
