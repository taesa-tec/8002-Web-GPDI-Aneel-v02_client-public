import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Provider} from '@angular/core';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';


@Injectable()
export class RegistroResolver implements Resolve<any> {

  static AsInfo(info: boolean, providerAs): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService],
      useFactory: (router: Router, service: ProjetoService) => new RegistroResolver(router, service, info)
    };
  }

  constructor(protected router: Router, protected service: ProjetoService, protected info = false) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = parseFloat(route.fragment);
    if (!isNaN(id)) {
      const projeto = this.service.getCurrentProjeto();
      if (this.info) {
        return await this.service.obter(`${projeto.id}/RegistroFinanceiro/${id}/Info`);
      }
      return await this.service.obter(`${projeto.id}/RegistroFinanceiro/${id}`);
    }
    return undefined;
  }

}

@Injectable()
export class RegistroObservacoesResolver implements Resolve<any> {
  constructor(protected router: Router, protected service: ProjetoService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = parseFloat(route.fragment);
    if (!isNaN(id)) {
      const projeto = this.service.getCurrentProjeto();
      return await this.service.obter(`${projeto.id}/RegistroFinanceiro/${id}/Observacoes`);
    }
    return undefined;
  }

}

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
    return await this.service.obter(`${projeto.id}/RegistroFinanceiro/${this.status}`);
  }

}
