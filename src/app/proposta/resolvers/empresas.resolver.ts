import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/proposta/services/propostas.service';

@Injectable()
export class EmpresasResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const _route = route.pathFromRoot.reverse().find(r => r.params.id);
    if (_route) {
      try {
        const result = await this.service.getEmpresas(_route.params.id);
        if (result !== null) {
          let empresas = [];
          empresas.push({
            text: result.empresa.nome,
            value: `e-${result.empresa.id}`
          });
          empresas.push({
            text: result.fornecedor.nome,
            value: `e-${result.fornecedor.id}`
          });
          empresas = empresas.concat(result.coExecutores.map(c => (
            {
              text: c.razaoSocial,
              value: `c-${c.id}`
            }
          )));
          return empresas;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return [];
  }

}
