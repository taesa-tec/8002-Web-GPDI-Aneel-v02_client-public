import {NgModule} from '@angular/core';
import {ListUsersComponent} from './list-users/list-users.component';
import {UserStatusPipe} from './user-status.pipe';
import {FormComponent} from './form/form.component';
import {CoreModule} from '@app/core';

@NgModule({
  declarations: [
    ListUsersComponent, UserStatusPipe, FormComponent,
  ],
  imports: [
    CoreModule
  ],
  exports: [ListUsersComponent]
})
export class UsersModule {
}
