import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GerenciarUsuariosComponent} from '@app/pages/gerenciar-usuarios/gerenciar-usuarios.component';
import {AdminGuard} from '@app/dashboard/shared/guards';
import {UserFormComponent} from '@app/pages/gerenciar-usuarios/user-form/user-form.component';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';
import {UserResolver} from '@app/pages/gerenciar-usuarios/users.resolver';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: GerenciarUsuariosComponent},
  {
    path: 'novo', pathMatch: 'full', component: UserFormComponent, canActivate: [AdminGuard],
    resolve: {
      empresas: EmpresasResolver
    }
  },
  {
    path: 'edit/:id', component: UserFormComponent, canActivate: [AdminGuard],
    resolve: {
      empresas: EmpresasResolver,
      user: UserResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarUsuariosRoutingModule {
}
