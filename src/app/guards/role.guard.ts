import {Injectable, Provider} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@app/services';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

  static To(role: string[], providerAs): Provider {
    return {
      provide: providerAs,
      deps: [AuthService, Router],
      useFactory: (auth: AuthService) => new RoleGuard(auth, role)
    };
  }

  constructor(private auth: AuthService, protected roles: string[]) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roles.indexOf(this.auth.user?.role) >= 0;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
