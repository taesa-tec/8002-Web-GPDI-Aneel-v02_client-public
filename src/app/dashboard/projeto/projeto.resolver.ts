import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot, CanActivate, UrlTree
} from '@angular/router';
import {Projeto} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjetoResolver implements Resolve<Projeto>, CanActivate {
    constructor(protected app: AppService, protected router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const id = route.params.id;
        if (isNaN(id)) {
            this.router.navigate(['/dashboard']);
            return null;
        }

        try {
            await this.app.projetos.setCurrent(id);

        } catch (e) {
            if (e instanceof HttpErrorResponse) {
                console.warn(e.message);
                switch (e.status) {
                    case 404:
                        this.app.alert('Projeto não encontrado ou excluído', 'Projeto Não encontrado');
                        break;
                    case 403:
                        this.app.alert('Você não tem permissão para acessar esse projeto', 'Acesso negado');
                        break;
                }
            }
            this.router.navigate(['/dashboard']);
        }
        return true;
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Projeto | null> {
        return this.app.projetos.getCurrent();

    }
}
