import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';
import {ROOT_URL} from '@app/commons';

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
