import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Projeto } from '@app/models';
import { ProjetosService } from './projetos.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoResolverService implements Resolve<Projeto>{
  constructor(protected projetosService: ProjetosService, protected router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Projeto | Observable<Projeto> | Promise<Projeto> {

    const id = parseInt(route.paramMap.get('id'), 10);

    return this.projetosService.getById(id).pipe(
      take(1),
      mergeMap(projeto => {
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
