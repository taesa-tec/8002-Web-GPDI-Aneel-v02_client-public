import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceBase} from '@app/services/service-base.service';
import {Injectable} from '@angular/core';
import {ContratosService} from '@app/services';

@Injectable()
export class ContratosPadroesResolver implements Resolve<any> {
  constructor(protected service: ContratosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.obter();
  }

}
