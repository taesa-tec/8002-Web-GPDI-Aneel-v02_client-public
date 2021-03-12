import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaptacoesService extends ServiceBase<any> {

  constructor(http: HttpClient) {
    super(http, 'Captacoes/Suprimento');
  }

  getPropostas(id: number, status: string = '') {
    return this.obter<Array<any>>(`${id}/Propostas/${status}`);
  }

  getProposta(id: number, propostaId) {
    return this.obter<Array<any>>(`${id}/Propostas/${propostaId}/Detalhes`);
  }

  estenderCaptacao(id: number, data: any) {
    return this.put(`${id}/Estender`, {termino: data});
  }

  cancelarCaptacao(id: number) {
    return this.delete(`${id}/Cancelar`);
  }
}
