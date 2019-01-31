import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NewUserComponent } from './new-user/new-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserStatusPipe } from './user-status.pipe';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
    declarations: [NewUserComponent, ListUsersComponent, UserStatusPipe, EditUserComponent],
    imports: [
        SharedModule,
    ],
    exports: [NewUserComponent, ListUsersComponent]
})
export class UsersModule { }
