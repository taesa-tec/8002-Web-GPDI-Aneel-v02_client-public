import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Projeto} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/projeto.facade';

@Injectable({
    providedIn: 'root'
})
export class ProjetoResolver implements Resolve<Projeto> {
    constructor(protected app: AppService, protected router: Router) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Projeto | null> {

        const id = parseInt(route.params.id || route.parent.params.id, 10);
        if (isNaN(id)) {
            this.router.navigate(['/dashboard']);
            return null;
        }

        return new Promise<Projeto | null>(resolver =>
            this.app.projetos.getById(id)
                .subscribe(p => resolver(new ProjetoFacade(p, this.app.projetos))));

    }

}
