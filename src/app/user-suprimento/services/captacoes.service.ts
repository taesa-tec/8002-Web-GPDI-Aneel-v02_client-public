import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaptacoesService extends ServiceBase<any> {

  constructor(http: HttpClient) {
    super(http, 'Captacoes/Suprimento');
  }

  getPropostas(id: number, status: '' | 'pendente' | 'aceito' | 'rejeitado' = '') {
    return this.obter<Array<any>>(`${id}/Propostas/${status}`);
  }
}
