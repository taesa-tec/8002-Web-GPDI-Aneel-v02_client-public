import {NgModule} from '@angular/core';
import {ListUsersComponent} from './list-users/list-users.component';
import {UserStatusPipe} from './user-status.pipe';
import {FormComponent} from './form/form.component';
import {MeComponent} from './me/me.component';
import {CoreModule} from '@app/core';

@NgModule({
  declarations: [
    ListUsersComponent, UserStatusPipe, FormComponent, MeComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [ListUsersComponent, MeComponent]
})
export class UsersModule {
}
