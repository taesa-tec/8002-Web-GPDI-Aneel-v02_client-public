import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {GerenciarUsuariosRoutingModule} from '@app/pages/gerenciar-usuarios/gerenciar-usuarios-routing.module';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios.component';
import {UsersModule} from './users/users.module';
import {UserFormComponent} from '@app/pages/gerenciar-usuarios/user-form/user-form.component';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';
import {UserResolver} from '@app/pages/gerenciar-usuarios/users.resolver';
import {UsersService} from '@app/services';


@NgModule({
  declarations: [
    GerenciarUsuariosComponent,
    UserFormComponent
  ],
  imports: [
    CoreModule,
    UsersModule,
    GerenciarUsuariosRoutingModule
  ],
  providers: [
    EmpresasResolver,
    UserResolver,
    UsersService
  ]
})
export class GerenciarUsuariosModule {
}
