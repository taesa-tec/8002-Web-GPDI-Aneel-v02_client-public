import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';

@Injectable()
export class ContratoShortcodesResolver implements Resolve<Array<any>> {

  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.obter('Shortcodes');
  }

}
