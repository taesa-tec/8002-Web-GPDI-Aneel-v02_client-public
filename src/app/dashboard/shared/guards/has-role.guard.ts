import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';


@Injectable()
export class HasRoleGuard implements CanActivate {
  constructor(protected auth: AuthService, protected app: AppService, protected router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (route.data.roles) {
      if (this.auth.userHasRoles(...route.data.roles)) {
        return true;
      }
      this.app.alert('Você não ter permissão para fazer isso', 'Acesso negado').then();
      return this.router.navigateByUrl('/');
    } else {
      console.warn('HasRoleGuard: Rota sem roles definida em "data"');
    }
    return true;
  }
}
