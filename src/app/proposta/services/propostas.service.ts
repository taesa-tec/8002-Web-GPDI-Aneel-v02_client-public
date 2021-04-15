import {Inject, Injectable, Provider} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {BaseEntity, Validations} from '@app/commons';
import {PROPOSTA_API_URL} from '@app/proposta/shared';

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
      deps: [HttpClient, PROPOSTA_API_URL],
      useFactory: (http: HttpClient, prefix) => new PropostaServiceBase(http, prefix, append)
    };
  }

  set captacaoId(value) {
    this.controller = `${this.prefix}/${value}/${this.append}`;
  }

  constructor(http: HttpClient, protected prefix, protected append: string) {
    super(http, prefix);
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
      deps: [HttpClient, PROPOSTA_API_URL],
      useFactory: (http: HttpClient, prefix) => new PropostasService(http, prefix)
    };
  }

  constructor(http: HttpClient, @Inject(PROPOSTA_API_URL) prefix: string) {
    super(http, `${prefix}/Propostas`);
  }

  async rejeitar(id: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Rejeitar`, {}).toPromise();
  }

  async participar(id: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Participar`, {}).toPromise();
  }

  async atualizarDuracao(id: number, duracao: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Duracao`, duracao).toPromise();
  }

  async getClausulas() {
    return await this.http.get<Array<any>>(`Fornecedor/Clausulas`).toPromise();
  }

  async getErros(id: number) {
    return await this.http.get<Validations>(`${this.controller}/${id}/Erros`, {}).toPromise();
  }

  async aceitarCondicoes(id: number) {
    return await this.http.post<any>(`${this.controller}/${id}/Condicoes`, {
      clausulasAceita: true,
      clausulaRejeitada: 0,
    }).toPromise();
  }

  async rejeitarCondicoes(id: number, condicaoId: number) {
    return await this.http.post<any>(`${this.controller}/${id}/Condicoes`, {
      clausulasAceita: false,
      clausulaRejeitada: condicaoId,
    }).toPromise();
  }

  async marcarComoFinalizado(id: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Finalizar`, {}).toPromise();
  }

  async saveCoExecutor(id: number, coExecutor: BaseEntity) {
    if (coExecutor.id === 0) {
      return await this.http.post(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
    }
    return await this.http.put(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
  }

  async getCoExecutores(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/CoExecutores`, {}).toPromise();
  }

  async getEmpresas(id: number) {
    return await this.http.get<any>(`${this.controller}/${id}/Empresas`, {}).toPromise();
  }

  async removerCoExecutor(id: number, coExecutorId: number) {
    return await this.http.delete(`${this.controller}/${id}/CoExecutores/${coExecutorId}`).toPromise();
  }

  async getContratos(id: number) {
    console.warn('Remover essa chamada!');
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos`, {}).toPromise();
  }

  async getContrato(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contrato`, {}).toPromise();
  }

  async getContratoRevisoes(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contrato/Revisoes`, {}).toPromise();
  }

  async getContratoRevisao(captacaoId: number, id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${captacaoId}/Contrato/Revisoes/${id}`, {})
      .toPromise();
  }

  async getContratoRevisaoDiff(captacaoId: number, id: number) {
    return await this.http.get(`${this.controller}/${captacaoId}/Contrato/Revisoes/${id}/Diff`, {responseType: 'text'})
      .toPromise();
  }


  async saveContrato(id: number, contrato: any) {
    return await this.http.post(`${this.controller}/${id}/Contrato`, contrato, {responseType: 'text'}).toPromise();
  }

  async getPlanoTrabalho(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/PlanoTrabalho`, {}).toPromise();
  }

  async savePlanoTrabalho(id: number, plano) {
    return await this.http.post<Array<BaseEntity>>(`${this.controller}/${id}/PlanoTrabalho`, plano).toPromise();
  }

  async downloadArquivo(captacaoId: number, file) {
    const blob = await this.http.get(`${this.controller}/Arquivos/${file.id}`, {
      responseType: 'blob'
    }).toPromise();

    const a = document.createElement('a');
    const blobUrl = URL.createObjectURL(blob);
    a.href = blobUrl;
    a.setAttribute('download', file.name);
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  async getEscopo(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Escopo`, {}).toPromise();
  }

  async saveEscopo(id: number, escopo: any) {
    return await this.http.post<Array<BaseEntity>>(`${this.controller}/${id}/Escopo`, escopo).toPromise();
  }

}

@Injectable()
export class ProdutosService extends PropostaServiceBase {

  constructor(http: HttpClient, prefix: string) {
    super(http, prefix, 'Produtos');
  }
}

@Injectable()
export class EtapasService extends PropostaServiceBase {

  constructor(http: HttpClient, prefix: string) {
    super(http, prefix, 'Etapas');
  }
}

@Injectable()
export class RecursosHumanosService extends PropostaServiceBase {

  constructor(http: HttpClient, prefix: string) {
    super(http, prefix, 'RecursosHumano');
  }
}

@Injectable()
export class RecursosMateriaisService extends PropostaServiceBase {

  constructor(http: HttpClient, prefix: string) {
    super(http, prefix, 'RecursosMateriais');
  }
}
