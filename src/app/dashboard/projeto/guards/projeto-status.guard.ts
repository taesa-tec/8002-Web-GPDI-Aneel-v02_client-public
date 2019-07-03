import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjetosService} from '@app/core/services/projetos.service';
import {ProjetoFacade} from '@app/facades/projeto.facade';
import {Projeto} from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class ProjetoStatusGuard implements CanActivate, CanActivateChild {
    constructor(protected projetoService: ProjetosService, protected router: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        const restrictStatus = next.routeConfig.path;
        //
        const currentProject: Projeto = await this.projetoService.getById(next.parent.params.id).toPromise();

        if (currentProject) {
            const currentStatus = currentProject.catalogStatus.status.toLowerCase();

            return currentStatus === restrictStatus ? true : this.router.parseUrl(`/dashboard/projeto/${currentProject.id}/${currentStatus}`);
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
