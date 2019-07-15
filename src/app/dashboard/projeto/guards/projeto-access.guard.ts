import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import {ProjetosService} from '@app/core/services/projetos.service';
import {Projeto} from '@app/models';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '@app/core/services/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetoAccessGuard implements CanActivate, CanActivateChild {


    public static readonly ADMIN = ['admin'];
    public static readonly APROVADOR = ['admin', 'aprovador'];
    public static readonly ESCRITA = ['admin', 'aprovador', 'leituraEscrita'];
    public static readonly LEITURA = ['admin', 'aprovador', 'leituraEscrita', 'leitura'];


    constructor(protected app: AppService, protected projetoService: ProjetosService, protected router: Router, protected  activedRoute: ActivatedRoute) {
    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const access = next.data.access;
        const redirectTo = next.data.redirectTo;
        if (access && Array.isArray(access)) {
            try {
                const my_access = await this.app.projetos.getCurrentAccess();
                const projeto = await this.projetoService.getCurrent();
                if (access.indexOf(my_access.valor) === -1) {
                    if (redirectTo) {

                        const extra = {relativeTo: this.activedRoute};

                        let redirectUrl = redirectTo;

                        if (typeof redirectTo === 'string') {
                            redirectUrl = redirectTo.replace(/:id\//g, `${projeto.id}/`);
                        } else if (Array.isArray(redirectTo)) {
                            redirectUrl = redirectTo.map(item => item.replace(/:id\//g, `${projeto.id}/`));
                        }

                        return Array.isArray(redirectUrl) ? this.router.navigate(redirectUrl, extra) : this.router.navigateByUrl(redirectUrl, extra);

                    } else {
                        this.app.alert('Você não tem permissão para acessar esta área do projeto', 'Acesso negado');
                        return this.router.parseUrl(`/dashboard`);
                    }
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
