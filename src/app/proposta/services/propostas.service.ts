import {Inject, Injectable, Provider} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {BaseEntity, Proposta, Validations} from '@app/commons';
import {PROPOSTA, PROPOSTA_API_URL} from '@app/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PropostaServiceBase extends ServiceBase<any> {

  static useExisting(t): Provider {
    return {
      provide: PropostaServiceBase,
      useExisting: t
    };
  }

  static fromAppend(append): Provider {
    return {
      provide: PropostaServiceBase,
      deps: [HttpClient, PROPOSTA_API_URL, PROPOSTA],
      useFactory: (http: HttpClient, prefix, proposta) => new PropostaServiceBase(http, proposta, prefix, append)
    };
  }

  set captacaoId(value) {
    console.warn('Remover chamada');
    this.controller = `${this.prefix}/${value}/${this.append}`;
  }

  constructor(http: HttpClient, protected proposta: BehaviorSubject<Proposta>, protected prefix, protected append: string) {
    super(http, prefix);
    proposta.subscribe(p => {
      this.controller = `${this.prefix}/${p.guid}/${this.append}`;
    });
  }
}

@Injectable()
export class PropostasService extends ServiceBase<any> {

  static useExisting(t): Provider {
    return {
      provide: PropostaServiceBase,
      useExisting: t
    };
  }

  static forUser(): Provider {
    return {
      provide: PropostasService,
      deps: [HttpClient],
      useFactory: (http: HttpClient) => {
        return new PropostasService(http);
      }
    };
  }

  constructor(http: HttpClient) {
    super(http, 'Propostas');
  }

  async rejeitar(guid: string) {
    return await this.http.put<any>(`${this.controller}/${guid}/Rejeitar`, {}).toPromise();
  }

  async participar(guid: string) {
    return await this.http.put<any>(`${this.controller}/${guid}/Participar`, {}).toPromise();
  }

  async atualizarDuracao(guid: string, duracao: number) {
    return await this.http.put<any>(`${this.controller}/${guid}/Duracao`, duracao).toPromise();
  }

  async getClausulas() {
    return await this.http.get<Array<any>>(`Clausulas`).toPromise();
  }

  async getErros(guid: string) {
    return await this.http.get<Validations>(`${this.controller}/${guid}/Erros`, {}).toPromise();
  }

  async aceitarCondicoes(guid: string) {
    return await this.http.post<any>(`${this.controller}/${guid}/Condicoes`, {
      clausulasAceita: true,
      clausulaRejeitada: 0,
    }).toPromise();
  }

  async rejeitarCondicoes(guid: string, condicaoId: number) {
    return await this.http.post<any>(`${this.controller}/${guid}/Condicoes`, {
      clausulasAceita: false,
      clausulaRejeitada: condicaoId,
    }).toPromise();
  }

  async marcarComoFinalizado(guid: string) {
    return await this.http.put<any>(`${this.controller}/${guid}/Finalizar`, {}).toPromise();
  }

  async saveCoExecutor(guid: string, coExecutor: BaseEntity) {
    if (coExecutor.id === 0) {
      return await this.http.post(`${this.controller}/${guid}/CoExecutores`, coExecutor).toPromise();
    }
    return await this.http.put(`${this.controller}/${guid}/CoExecutores`, coExecutor).toPromise();
  }

  async getCoExecutores(guid: string) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/CoExecutores`, {}).toPromise();
  }

  async getEmpresas(guid: string) {
    return await this.http.get<any>(`${this.controller}/${guid}/Empresas`, {}).toPromise();
  }

  async removerCoExecutor(guid: string, coExecutorId: number) {
    return await this.http.delete(`${this.controller}/${guid}/CoExecutores/${coExecutorId}`).toPromise();
  }

  async getContratos(guid: string) {
    console.warn('Remover essa chamada!');
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contratos`, {}).toPromise();
  }

  async getContrato(guid: string) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato`, {}).toPromise();
  }

  async getContratoRevisoes(guid: string) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato/Revisoes`, {}).toPromise();
  }

  async getContratoRevisao(guid: string, id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato/Revisoes/${guid}`, {})
      .toPromise();
  }

  async getContratoRevisaoDiff(guid: string, id: number) {
    return await this.http.get(`${this.controller}/${guid}/Contrato/Revisoes/${id}/Diff`, {responseType: 'text'})
      .toPromise();
  }


  async saveContrato(guid: string, contrato: any) {
    return await this.http.post(`${this.controller}/${guid}/Contrato`, contrato, {responseType: 'text'}).toPromise();
  }

  async getPlanoTrabalho(guid: string) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/PlanoTrabalho`, {}).toPromise();
  }

  async savePlanoTrabalho(guid: string, plano) {
    return await this.http.post<Array<BaseEntity>>(`${this.controller}/${guid}/PlanoTrabalho`, plano).toPromise();
  }

  async getEscopo(guid: string) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Escopo`, {}).toPromise();
  }

  async saveEscopo(guid: string, escopo: any) {
    return await this.http.post<Array<BaseEntity>>(`${this.controller}/${guid}/Escopo`, escopo).toPromise();
  }

}

@Injectable()
export class PropostaService extends PropostaServiceBase {
  constructor(http: HttpClient, proposta: BehaviorSubject<Proposta>, prefix: string) {
    super(http, proposta, prefix, '');
  }
}

@Injectable()
export class ProdutosService extends PropostaServiceBase {

  constructor(http: HttpClient, proposta: BehaviorSubject<Proposta>, prefix: string) {
    super(http, proposta, prefix, 'Produtos');
  }
}

@Injectable()
export class EtapasService extends PropostaServiceBase {

  constructor(http: HttpClient, proposta: BehaviorSubject<Proposta>, prefix: string) {
    super(http, proposta, prefix, 'Etapas');
  }
}

@Injectable()
export class RecursosHumanosService extends PropostaServiceBase {

  constructor(http: HttpClient, proposta: BehaviorSubject<Proposta>, prefix: string) {
    super(http, proposta, prefix, 'RecursosHumano');
  }
}

@Injectable()
export class RecursosMateriaisService extends PropostaServiceBase {

  constructor(http: HttpClient, proposta: BehaviorSubject<Proposta>, prefix: string) {
    super(http, proposta, prefix, 'RecursosMateriais');
  }
}
