import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProjetoService} from '../services/projeto.service';

@Injectable()
export class EmpresasResolver implements Resolve<any> {

  constructor(protected service: ProjetoService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const projeto = this.service.getCurrentProjeto();
      return await this.service.obter<any>(`${projeto.id}/Empresas`);
    } catch (e) {
      console.log(e);
    }
    return [];
  }

}
