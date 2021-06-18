import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {RecursosMateriaisService} from '@app/propostas/proposta/services/proposta-service-base.service';
import {extractRouteParams} from '@app/core';

@Injectable()
export class RecursosMateriaisResolver implements Resolve<any> {

  constructor(protected service: RecursosMateriaisService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      this.service.captacaoId = params.id;
      try {
        const result = await this.service.obter();
        if (result !== null) {
          return result;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return [];
  }

}

@Injectable()
export class RecursoMaterialResolver implements Resolve<any> {

  constructor(protected service: RecursosMateriaisService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.obter(route.fragment);
    }
    return null;
  }

}
