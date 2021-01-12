import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';

@Injectable()
export class PropostasResolver implements Resolve<Array<any>> {

  constructor(protected service: PropostasService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.obter();
  }

}
