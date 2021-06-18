import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {EtapasService} from '@app/users-modules/fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';

@Injectable()
export class EtapasResolver implements Resolve<any> {

  constructor(protected service: EtapasService, protected router: Router) {
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
export class EtapaResolver implements Resolve<any> {

  constructor(protected service: EtapasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.obter(route.fragment);
    }
    return null;
  }

}
