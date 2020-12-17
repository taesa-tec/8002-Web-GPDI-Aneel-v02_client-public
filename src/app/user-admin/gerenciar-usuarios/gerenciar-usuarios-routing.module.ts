import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GerenciarUsuariosComponent} from '@app/user-admin/gerenciar-usuarios/gerenciar-usuarios.component';
import {NewUserComponent} from '@app/dashboard/users/new-user/new-user.component';
import {AdminGuard} from '@app/dashboard/shared/guards';
import {EditUserComponent} from '@app/dashboard/users/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: GerenciarUsuariosComponent},
  {path: 'novo', pathMatch: 'full', component: NewUserComponent, canActivate: [AdminGuard]},
  {path: 'edit/:id', component: EditUserComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarUsuariosRoutingModule {
}
