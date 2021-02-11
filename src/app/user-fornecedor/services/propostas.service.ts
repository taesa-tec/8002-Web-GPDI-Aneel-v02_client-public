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

  async getCoExecutores(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/CoExecutores`, {}).toPromise();
  }

  async getContratos(id: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos`, {}).toPromise();
  }

  async getContrato(id: number, contratoId: number) {
    return await this.http.get<Array<BaseEntity>>(`${this.controller}/${id}/Contratos/${contratoId}`, {}).toPromise();
  }

  async saveCoExecutor(id: number, coExecutor: BaseEntity) {
    if (coExecutor.id === 0) {
      return await this.http.post(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
    }
    return await this.http.put(`${this.controller}/${id}/CoExecutores`, coExecutor).toPromise();
  }

  async saveContrato(id: number, contratoId: number, contrato: any) {
    return await this.http.post(`${this.controller}/${id}/Contratos/${contratoId}`, contrato).toPromise();
  }

  async removerCoExecutor(id: number, coExecutorId: number) {
    return await this.http.delete(`${this.controller}/${id}/CoExecutores/${coExecutorId}`).toPromise();
  }
}
