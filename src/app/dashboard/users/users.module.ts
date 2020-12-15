import {NgModule} from '@angular/core';
import {NewUserComponent} from './new-user/new-user.component';
import {ListUsersComponent} from './list-users/list-users.component';
import {UserStatusPipe} from './user-status.pipe';
import {EditUserComponent} from './edit-user/edit-user.component';
import {FormComponent} from './form/form.component';
import {MeComponent} from './me/me.component';
import {UserProjetosComponent} from './user-projetos/user-projetos.component';
import {CoreModule} from '@app/core';

@NgModule({
  declarations: [
    NewUserComponent, ListUsersComponent, UserStatusPipe, EditUserComponent, FormComponent, MeComponent, UserProjetosComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [NewUserComponent, ListUsersComponent, MeComponent]
})
export class UsersModule {
}
