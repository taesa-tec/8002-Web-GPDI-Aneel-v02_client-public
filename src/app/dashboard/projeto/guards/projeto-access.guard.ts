import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {ProjetosService} from '@app/core/services/projetos.service';
import {Projeto} from '@app/models';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '@app/core/services/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetoAccessGuard implements CanActivate, CanActivateChild {
    constructor(protected app: AppService, protected projetoService: ProjetosService, protected router: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        const access = next.data.access;
        if (access && Array.isArray(access)) {
            try {
                const my_access = await this.app.projetos.getCurrentAccess();
                if (access.indexOf(my_access.valor) === -1) {
                    this.app.alert('Você não tem permissão para acessar esta área do projeto', 'Acesso negado');
                    return this.router.parseUrl(`/dashboard`);
                }
            } catch (e) {
                console.log({e});
                return false;
            }
        }
        return true;
    }

    async canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        return this.canActivate(next, state);

    }
}
