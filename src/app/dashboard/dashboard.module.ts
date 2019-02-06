import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '@app/shared/shared.module';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';
import { ProjetosModule } from '@app/projetos/projetos.module';

import { AuthInterceptor } from '@app/http-interceptors/auth-iterceptor';
import { UsersModule } from '@app/users/users.module';

@NgModule({
  declarations: [
    DashboardComponent,
    MeuCadastroComponent,
    NotFoundComponent,
    GerenciarUsuariosComponent,
    MeusProjetosComponent,
  ],
  imports: [
    SharedModule,
    ProjetosModule,
    UsersModule,
    DashboardRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class DashboardModule { }
