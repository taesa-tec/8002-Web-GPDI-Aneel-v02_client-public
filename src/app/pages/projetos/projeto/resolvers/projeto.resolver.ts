import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable, Provider} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ROOT_URL} from '@app/commons';
import {template} from 'lodash-es';

@Injectable()
export class ProjetoResolver implements Resolve<any> {

  constructor(protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {

      const projeto = await this.service.obter(route.params.id) as Projeto;
      if (projeto) {
        this.service.setProjeto(projeto);
        return projeto;
      }
    } catch (e) {
      console.error('Projeto não encontrado!');
    }
    await this.router.navigateByUrl('/projetos');
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

  constructor(protected router: Router, protected service: ProjetoService, protected node: string) {
    if (!node) {
      throw new Error('É necessário especificar o node');
    }
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = this.service.getCurrentProjeto();

    if (this.node) {
      const node = template(this.node.replace(/#$/g, ''))(route);
      if (this.node.endsWith('#')) {
        if (!route.fragment || Number.isNaN(parseFloat(route.fragment))) {
          return null;
        }
      }

      return await this.service.obter(`${projeto.id}/${node}`);
    }
  }

}

@Injectable()
export class ProjetoStatusResolver implements Resolve<any> {

  static Status(status: string, providerAs): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService],
      useFactory: (router: Router, service: ProjetoService) => new ProjetoStatusResolver(router, service, status)
    };
  }

  constructor(protected router: Router, protected service: ProjetoService, protected status: string) {
    if (!status) {
      throw new Error('É necessário especificar o status');
    }
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = this.service.getCurrentProjeto();
    if (this.status !== projeto.status) {
      return this.router.navigateByUrl('/');
    }
    return projeto.status;
  }

}
