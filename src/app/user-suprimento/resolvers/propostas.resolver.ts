import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';
import {PropostasComponent} from '@app/user-suprimento/captacoes/captacao/propostas/propostas.component';
import {camelCase} from 'lodash-es';

@Injectable()
export class PropostasResolver implements Resolve<Array<any>> {

  constructor(protected service: CaptacoesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
    const id = route.params.id || route.parent?.params.id || route.parent?.parent?.params.id;
    const status = camelCase(route.params.status);

    if (id) {
      return this.service.getPropostas(id, status);
    }
    return [];
  }

}
