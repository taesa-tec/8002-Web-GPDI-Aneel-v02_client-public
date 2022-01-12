import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {extractRouteParams} from '@app/core';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';

@Injectable()
export class CrudDataResolver implements Resolve<any> {

  constructor(protected service: PropostaServiceBase, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      try {
        const result = await this.service.obter();
        if (result !== null) {
          return result;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

}

@Injectable()
export class CrudItemResolver implements Resolve<any> {

  constructor(protected service: PropostaServiceBase, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      if (route.fragment && !isNaN(parseFloat(route.fragment))) {
        return await this.service.obter(route.fragment);
      }
    }
    return null;
  }

}
