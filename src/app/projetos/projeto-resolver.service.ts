import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {Projeto} from '@app/models';
import {ProjetosService} from './projetos.service';
import {AppService} from '@app/app.service';

@Injectable({
    providedIn: 'root'
})
export class ProjetoResolverService implements Resolve<Projeto> {
    constructor(protected app: AppService, protected router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Projeto | Observable<Projeto> | Promise<Projeto> {
        const id = parseInt(route.params.id || route.parent.params.id, 10);
        if (isNaN(id)) {
            this.router.navigate(['/dashboard']);
            return EMPTY;
        }
        return this.app.projetos.getById(id).pipe(
            take(1),
            mergeMap(projeto => {
                console.log(projeto);
                if (projeto) {
                    return of(projeto);
                } else { // id not found
                    this.router.navigate(['/dashboard']);
                    return EMPTY;
                }
            })
        );
    }

}
