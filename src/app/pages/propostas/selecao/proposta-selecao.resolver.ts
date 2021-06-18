import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services';
import {Injectable} from '@angular/core';

@Injectable()
export class PropostaSelecaoResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.obter(`${route.fragment}/Propostas`);
    }
    return null;
  }


}
