import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PropostaResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = await this.service.obter(route.params.id);
    if (result !== null) {
      return result;
    }
    await this.router.navigate(['/fornecedor', 'propostas']);
  }
}

@Injectable()
export class EscopoResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      const result = await this.service.getEscopo(params.id);
      if (result !== null) {
        return result;
      }
    }
    await this.router.navigate(['/fornecedor', 'propostas']);
  }
}

@Injectable()
export class PropostaDocumentoResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected http: HttpClient, protected router: Router) {
  }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      return await this.http.get<any>(`Fornecedor/Propostas/${params.id}/Documento`).toPromise();
    }
    await this.router.navigate(['/fornecedor', 'propostas']);
  }
}

@Injectable()
export class PropostaErrosResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected http: HttpClient, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      return await this.service.getErros(params.id);
    }
    await this.router.navigate(['/fornecedor', 'propostas']);
  }
}
