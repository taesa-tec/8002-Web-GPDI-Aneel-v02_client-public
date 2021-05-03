import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@app/services/auth.service';
import {RootsUrl} from '@app/routes/routes';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (!this.authService.isLoggedIn) {
      return true;
    }
    const root = RootsUrl.get(this.authService.user.role);
    return this.router.parseUrl(`${root}`);

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);

  }
}
