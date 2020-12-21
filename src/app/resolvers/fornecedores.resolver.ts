import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {FornecedoresService} from '@app/services';

@Injectable()
export class FornecedoresResolver implements Resolve<any> {
  constructor(protected service: FornecedoresService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.obter();
  }

}
