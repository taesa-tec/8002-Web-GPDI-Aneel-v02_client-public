import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CatalogsService} from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class PaisesResolver implements Resolve<Array<any>> {

  constructor(protected service: CatalogsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.paises();
  }

}
