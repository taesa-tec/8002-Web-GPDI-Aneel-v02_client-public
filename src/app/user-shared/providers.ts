import {FactoryProvider} from '@angular/core';
import {CURRENT_USER} from '@app/commons';
import {AuthService} from '@app/services';

export const CurrentUseProvider: FactoryProvider = {
  provide: CURRENT_USER,
  deps: [AuthService],
  useFactory: (auth: AuthService) => {
    return auth.user;
  }
};

