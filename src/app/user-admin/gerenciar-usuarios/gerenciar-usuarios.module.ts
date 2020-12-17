import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {GerenciarUsuariosRoutingModule} from '@app/user-admin/gerenciar-usuarios/gerenciar-usuarios-routing.module';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios.component';
import {UsersModule} from '@app/dashboard/users/users.module';


@NgModule({
  declarations: [
    GerenciarUsuariosComponent,
  ],
  imports: [
    CoreModule,
    UsersModule,
    GerenciarUsuariosRoutingModule
  ]
})
export class GerenciarUsuariosModule {
}
