import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';

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
}
