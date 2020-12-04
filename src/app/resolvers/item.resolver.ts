import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceBase} from '@app/services/service-base.service';

@Injectable()
export class ItemResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (route.params.id) {
      return new Promise(resolve => {
        this.service.obter(route.params.id)
          .then(value => resolve(value))
          .catch(err => resolve(err));
      });
    }
    return null;
  }
}
