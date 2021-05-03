import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@app/services';
import {UserRole} from '@app/commons';
import {RootsUrl} from '@app/routes/routes';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router, protected roles: string[]) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.roles.indexOf(this.auth.user?.role) >= 0) {
      return true;
    }
    const root = RootsUrl.get(this.auth.user.role);
    if (root) {
      return this.router.navigateByUrl(root);
    }
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard extends RoleGuard {
  constructor(auth: AuthService, router: Router) {
    super(auth, router, [UserRole.Administrador, UserRole.User, UserRole.Suprimento]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard extends RoleGuard {
  constructor(auth: AuthService, router: Router) {
    super(auth, router, [UserRole.User]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SuprimentoRoleGuard extends RoleGuard {
  constructor(auth: AuthService, router: Router) {
    super(auth, router, [UserRole.Suprimento]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorRoleGuard extends RoleGuard {
  constructor(auth: AuthService, router: Router) {
    super(auth, router, [UserRole.Fornecedor]);
  }
}
