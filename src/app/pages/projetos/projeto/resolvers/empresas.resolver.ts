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
      const result = await this.service.obter<any>(`${projeto.id}/Empresas`);
      if (result !== null) {
        if (result !== null) {
          let empresas = result.empresas.map(e => ({text: e.nome, value: `e-${e.id}`}));
          let coExecutores = result.coExecutores.map(e => ({text: e.razaoSocial, value: `c-${e.id}`}));

          
          return [...empresas, ...coExecutores];
        }
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  }

}
