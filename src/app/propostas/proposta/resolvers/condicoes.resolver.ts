import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/propostas/proposta/services/propostas.service';

@Injectable()
export class CondicoesResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = await this.service.getClausulas();
    if (result !== null) {
      return result;
    }
    return [];
  }

}
