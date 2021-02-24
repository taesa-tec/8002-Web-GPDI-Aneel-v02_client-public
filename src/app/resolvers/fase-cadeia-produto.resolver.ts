import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CatalogsService} from '@app/services';

@Injectable()
export class FaseCadeiaProdutoResolver implements Resolve<Array<any>> {

  constructor(protected service: CatalogsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    return this.service.produtoFasesCadeia();
  }

}
