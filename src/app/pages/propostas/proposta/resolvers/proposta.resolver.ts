import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {extractRouteParams} from '@app/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Proposta, ROOT_URL} from '@app/commons';
import {AppService} from '@app/services';

@Injectable()
export class PropostaResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router, protected app: AppService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {

      const result = await this.service.obter(route.params.id) as Proposta;
      if (result !== null) {
        this.service.setProposta(result);
        return result;
      }
    } catch (e) {
      console.error(e);
      if (e instanceof HttpErrorResponse) {
        this.app.alert('Proposta não encontrada!').then();
      }
      await this.router.navigate(['/', 'propostas']);
    }
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
      return await this.http.get<any>(`Propostas/${params.id}/Documento`).toPromise();
    }
    await this.router.navigate(['/']);
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
