import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceBase} from '@app/services/service-base.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ContratoPadraoResolver implements Resolve<any> {
  constructor(protected service: ServiceBase<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (route.params.id) {
      return this.service.obter(route.params.id);
    }

  }

}
