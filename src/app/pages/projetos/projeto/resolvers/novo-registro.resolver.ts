import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {ROOT_URL} from '@app/commons';

@Injectable()
export class NovoRegistroResolver implements Resolve<any> {

  constructor(@Inject(ROOT_URL) protected root_url, protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await new Promise(resolve =>
      this.service.projeto.subscribe(async projeto => {
        resolve(await this.service.obter(`${projeto.id}/RegistroFinanceiro/Criar`));
      }));
  }

}
