import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild, CanLoad, UrlSegment, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@app/core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {


    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {

        if (this.authService.isLoggedIn) {
            return true;
        }
        return this.router.parseUrl('/login');
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);

    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        return false;
    }
}
