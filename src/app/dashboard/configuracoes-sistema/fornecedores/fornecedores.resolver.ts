import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceBase} from '@app/services/service-base.service';
import {Injectable} from '@angular/core';

@Injectable()
export class FornecedoresResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.obter();
  }

}
