import {InjectionToken, Provider} from '@angular/core';
import {User} from '@app/models';
import {UsersService} from '@app/services/users.service';

export const CURRENT_USER = new InjectionToken<User>('current_user');

export const currentUserProvider: Provider = {
  provide: CURRENT_USER,
  useFactory: (userservice: UsersService) => userservice.currentUser,
  multi: false,
  deps: [UsersService]
};


