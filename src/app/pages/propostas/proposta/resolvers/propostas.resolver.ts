import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';

@Injectable()
export class PropostasResolver implements Resolve<Array<any>> {

  constructor(protected service: PropostasService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    if (route.url.length > 0 && route.url[0].path === 'encerradas') {
      return this.service.obter('Encerradas');
    }
    return this.service.obter();
  }

}
