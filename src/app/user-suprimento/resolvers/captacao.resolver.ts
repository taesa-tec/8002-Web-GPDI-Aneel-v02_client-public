import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';

@Injectable()
export class CaptacaoResolver implements Resolve<any> {

  constructor(protected service: CaptacoesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.obter(route.params.id);
  }

}
