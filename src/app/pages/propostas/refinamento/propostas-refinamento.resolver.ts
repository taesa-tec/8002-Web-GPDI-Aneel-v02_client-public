import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services';
import {Injectable} from '@angular/core';

@Injectable()
export class PropostasRefinamentoResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await this.service.obter(`Refinamento`);
  }


}
