import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/proposta/services/propostas.service';

@Injectable()
export class CoExecutoresResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const _route = route.pathFromRoot.reverse().find(r => r.params.id);
    if (_route) {
      try {
        const result = await this.service.getCoExecutores(_route.params.id);
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
