import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';

@Injectable()
export class CrudDataResolver implements Resolve<any> {

  constructor(protected service: PropostaServiceBase, protected router: Router) {
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
export class CrudItemResolver implements Resolve<any> {

  constructor(protected service: PropostaServiceBase, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      this.service.captacaoId = params.id;
      if (route.fragment && !isNaN(parseFloat(route.fragment))) {
        return await this.service.obter(route.fragment);
      }
    }
    return null;
  }

}
