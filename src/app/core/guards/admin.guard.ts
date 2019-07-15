import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UsersService} from '@app/core/services/users.service';
import {UserRole} from '@app/models';
import {AppService} from '@app/core/services/app.service';


@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(protected userService: UsersService, protected app: AppService, protected router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const me = await this.userService.me().toPromise();
        if (me.role !== UserRole.Administrador) {
            this.app.alert('Você não ter permissão para fazer isso', 'Acesso negado');
            return this.router.navigateByUrl('/dashboard');
        }

        return true;
    }
}
