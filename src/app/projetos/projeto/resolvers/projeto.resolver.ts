import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable, Provider} from '@angular/core';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {Projeto} from '@app/projetos/projeto/projeto.component';
import {ROOT_URL} from '@app/commons';

@Injectable()
export class ProjetoResolver implements Resolve<any> {

  constructor(@Inject(ROOT_URL) protected root_url, protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = await this.service.obter(route.params.id) as Projeto;
    if (projeto) {
      this.service.setProjeto(projeto);
      return projeto;
    }
    await this.router.navigate([this.root_url, 'projetos']);
  }

}


@Injectable()
export class ProjetoNodeResolver implements Resolve<any> {

  static Node(node: string, providerAs): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService],
      useFactory: (router: Router, service: ProjetoService) => new ProjetoNodeResolver(router, service, node)
    };
  }

  constructor(protected router: Router, protected service: ProjetoService, protected node) {
    if (!node) {
      throw new Error('É necessário especificar o nodo');
    }
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = this.service.getCurrentProjeto();

    if (this.node) {
      return await this.service.obter(`${projeto.id}/${this.node}`);
    }
  }

}
