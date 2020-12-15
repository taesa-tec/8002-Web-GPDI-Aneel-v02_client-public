import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserRole} from '@app/models';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(protected auth: AuthService, protected app: AppService, protected router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const me = await this.auth.user;
    if (me.role !== UserRole.Administrador) {
      this.app.alert('Você não ter permissão para fazer isso', 'Acesso negado').then();
      return this.router.navigateByUrl('/dashboard');
    }

    return true;
  }
}
