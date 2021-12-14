import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {ProdutosService} from '@app/users-modules/fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';

@Injectable()
export class ProdutosResolver implements Resolve<any> {

  constructor(protected service: ProdutosService, protected router: Router) {
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

      }
    }
    return [];
  }

}

@Injectable()
export class ProdutoResolver implements Resolve<any> {

  constructor(protected service: ProdutosService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.obter(route.fragment);
    }
    return null;
  }

}
