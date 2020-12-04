import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceBase} from '@app/services/service-base.service';

@Injectable()
export class ListResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(resolve => {
      this.service.obter()
        .then(value => resolve(value))
        .catch(err => resolve(err));
    });
  }

}
