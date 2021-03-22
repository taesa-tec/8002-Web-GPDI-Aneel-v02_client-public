import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';
import {ServiceBase} from '@app/services';

@Injectable()
export class CrudDataResolver implements Resolve<any> {

  constructor(protected service: ServiceBase<any>, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const result = await this.service.obter();
    if (result !== null) {
      return result;
    }
    return [];
  }

}

@Injectable()
export class CrudItemResolver implements Resolve<any> {

  constructor(protected service: ServiceBase<any>, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.obter(route.fragment);
    }
    return null;
  }
}
