import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Provider} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';


@Injectable()
export class RelatorioResolver implements Resolve<any> {

  static ToType(type: string, providerAs: string): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService],
      useFactory: (router: Router, service: ProjetoService) => new RelatorioResolver(type, router, service)
    };
  }

  constructor(protected type: string, protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const projeto = this.service.getCurrentProjeto();
      const id = parseFloat(route.fragment) || '';

      return await this.service.obter(`${projeto.id}/Relatorio/${this.type}/${id}`);
    } catch(e) {
      return null;
    }
  }

}
