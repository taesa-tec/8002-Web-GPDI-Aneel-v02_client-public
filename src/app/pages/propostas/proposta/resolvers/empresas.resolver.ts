import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';

@Injectable()
export class EmpresasResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const _route = route.pathFromRoot.reverse().find(r => r.params.id);
    if (_route) {
      try {
        return await this.service.getEmpresas(_route.params.id);
      } catch (e) {
        console.log(e);
      }
    }
    return [];
  }

}
