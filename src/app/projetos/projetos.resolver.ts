import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ProjetosResolver implements Resolve<Array<any>> {

  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.obter(route.data.status || '');
  }

}
