import {InjectionToken, Provider} from '@angular/core';
import {User} from '@app/commons';
import {AuthService} from '@app/services/auth.service';

export const CURRENT_USER = new InjectionToken<User>('current_user');

export const currentUserProvider: Provider = {
  provide: CURRENT_USER,
  useFactory: (authService: AuthService) => authService.user,
  multi: false,
  deps: [AuthService]
};


