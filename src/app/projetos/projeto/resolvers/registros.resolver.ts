import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable, Provider} from '@angular/core';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {ROOT_URL} from '@app/commons';

@Injectable()
export class RegistrosResolver implements Resolve<any> {

  static ToStatus(status: string, providerAs: string): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService],
      useFactory: (router: Router, service: ProjetoService) => new RegistrosResolver(status, router, service)
    };
  }

  constructor(protected status: string, protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = this.service.getCurrentProjeto();
    console.log(projeto);
    return await this.service.obter(`${projeto.id}/RegistroFinanceiro/${this.status}`);
  }

}
