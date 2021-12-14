import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmpresasService} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class EmpresasResolver implements Resolve<Array<any>> {

  constructor(protected service: EmpresasService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.obter();
  }

}
