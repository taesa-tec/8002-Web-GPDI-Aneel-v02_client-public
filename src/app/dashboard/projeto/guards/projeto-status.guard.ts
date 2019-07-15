import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {ProjetosService} from '@app/core/services/projetos.service';
import {Projeto} from '@app/models';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '@app/core/services/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetoStatusGuard implements CanActivate, CanActivateChild {
    constructor(protected app: AppService, protected projetoService: ProjetosService, protected router: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const restrictStatus = next.routeConfig.path;
        try {
            const currentProject: Projeto = await this.projetoService.getCurrent();

            if (currentProject) {
                const currentStatus = currentProject.catalogStatus.status.toLowerCase();

                return currentStatus === restrictStatus ? true : this.router.parseUrl(`/dashboard/projeto/${currentProject.id}/${currentStatus}`);
            }
        } catch (e) {

            console.log({e});
        }


        return this.router.parseUrl(`/dashboard`);

    }

    async canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        const p = await this.projetoService.getCurrent();

        console.log(p);

        if (p.catalogStatus.status === next.data.projetoStatus) {
            return true;
        } else {
            return this.router.parseUrl(`/dashboard/projeto/${p.id}/${p.catalogStatus.status.toLowerCase()}`);
        }
    }
}
