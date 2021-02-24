import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {BaseEntity} from '@app/commons';

@Injectable()
export class PropostasService extends ServiceBase<any> {

  constructor(http: HttpClient) {
    super(http, 'Fornecedor/Propostas');
  }

  async rejeitar(id: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Rejeitar`, {}).toPromise();
  }

  async participar(id: number) {
    return await this.http.put<any>(`${this.controller}/${id}/Participar`, {}).toPromise();
  }

  async getClausulas() {
    return await this.http.get<Array<any>>(`Fornecedor/Clausulas`).toPromise();
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

  async saveCoExecutor(id: number, coExecutor: BaseEntity) {
    if (coExecutor.id === 0) {
      return await this.http.post(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
    }
    return await this.http.put(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
  }

  async getCoExecutores(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/CoExecutores`, {}).toPromise();
  }

  async removerCoExecutor(id: number, coExecutorId: number) {
    return await this.http.delete(`${this.controller}/${id}/CoExecutores/${coExecutorId}`).toPromise();
  }

  async getContratos(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos`, {}).toPromise();
  }

  async getContrato(id: number, contratoId: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos/${contratoId}`, {}).toPromise();
  }

  async getContratoRevisoes(id: number, contratoId: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos/${contratoId}/Revisoes`, {}).toPromise();
  }

  async getContratoRevisao(propostaId: number, contratoId: number, id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${propostaId}/Contratos/${contratoId}/Revisoes/${id}`, {})
      .toPromise();
  }

  async getContratoRevisaoDiff(propostaId: number, contratoId: number, id: number) {
    return await this.http.get(`${this.controller}/${propostaId}/Contratos/${contratoId}/Revisoes/${id}/Diff`, {responseType: 'text'})
      .toPromise();
  }


  async saveContrato(id: number, contratoId: number, contrato: any) {
    return await this.http.post(`${this.controller}/${id}/Contratos/${contratoId}`, contrato).toPromise();
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




}
