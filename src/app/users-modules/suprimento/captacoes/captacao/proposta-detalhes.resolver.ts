import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CaptacoesService} from '@app/users-modules/suprimento/services/captacoes.service';
import {extractRouteParams} from '@app/core';
import {Injectable} from '@angular/core';

@Injectable()
export class PropostaDetalhesResolver implements Resolve<any> {
  constructor(protected service: CaptacoesService) {

  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const params = extractRouteParams(route);
    if (route.fragment && !isNaN(parseFloat(route.fragment))) {
      return await this.service.getProposta(params.id, route.fragment);
    }
    return undefined;
  }

}
