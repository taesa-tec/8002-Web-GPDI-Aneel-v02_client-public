import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';

@Injectable()
export class PropostaResolver implements Resolve<any> {

  constructor(protected service: PropostasService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.obter(route.params.id);
  }

}
