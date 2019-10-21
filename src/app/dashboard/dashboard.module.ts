import { NgModule } from '@angular/core';
// import { SharedModule } from '@app/core/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { UsersModule } from '@app/users/users.module';
import { NovoProjetoComponent } from '@app/core/shared/novo-projeto/novo-projeto.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,

    NovoProjetoComponent,
  ],
  entryComponents: [NovoProjetoComponent],
  imports: [
    SharedModule,
    UsersModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule {
}
