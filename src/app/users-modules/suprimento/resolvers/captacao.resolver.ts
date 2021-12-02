import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CaptacoesService} from '@app/users-modules/suprimento/services/captacoes.service';

@Injectable()
export class CaptacaoResolver implements Resolve<any> {

  constructor(protected service: CaptacoesService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    try {
      const result = await this.service.obter(route.params.id);
      if (result) {
        return result;
      }
    } catch (e) {
      console.error(e);
    }
    this.router.navigate(['/']).then();
  }

}
