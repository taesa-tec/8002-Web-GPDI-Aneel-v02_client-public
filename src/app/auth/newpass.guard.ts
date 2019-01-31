import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewpassGuard implements CanActivate {
    constructor(protected router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): UrlTree | boolean {
        const query = state.root.queryParams;
        const canContinue = query.email && query.email.length > 0 && query.token && query.token.length > 0;

        return canContinue ? true : this.router.parseUrl('/login');


    }
}
