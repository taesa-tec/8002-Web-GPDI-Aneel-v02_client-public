import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UsersService} from '@app/services';

@Injectable()
export class UserResolver implements Resolve<Array<any>> {

  constructor(protected service: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.obter(route.params.id);
  }

}
