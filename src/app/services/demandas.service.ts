import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Demanda, FormField} from '@app/models/demandas';

@Injectable({
  providedIn: 'root'
})
export class DemandasService {


  constructor(private http: HttpClient) {
  }


  getDemandasByStatus(status: 'Reprovadas' | 'Aprovadas' | 'EmElaboracao' | 'Captacao') {
    return this.http.get<Array<Demanda>>(`Demandas/${status}`);
  }

  minhasDemadas() {
    return this.http.get<any>('');
  }

  getDemanda(id: number) {
    return this.http.get<any>(`Demandas/${id}`);
  }

  getDemandaForm(id: number, key: string) {
    return this.http.get<any>(`Demandas/${id}/Form/${key}`);
  }

  criarDemanda(titulo: any) {
    return this.http.post('Demandas/Criar', `"${titulo}"`, {headers: {'Content-Type': 'application/json'}});
  }

  editarDemanda(demandaUpdate: number) {
    return this.http.put<any>('', demandaUpdate);
  }

  editarDemandaForm(id: number, key: string, data: object) {
    return this.http.put<any>(`Demandas/${id}/Form/${key}`, data);
  }

  excluirDemanda(id: number) {
    return this.http.delete<any>(`delete/${id}/demanda`);
  }

  aprovarDemanda(id: number, etapa: any) {
    return this.http.put<any>('', id);
  }

  reprovarDemanda(id: number, motivo: any) {
    return this.http.put<any>('', motivo);
  }

  enviarParaAprovacao(id: number, motivo: any) {
    return this.http.post<any>('', id);
  }

  getComentario() {
    return this.http.get<any>('');
  }

  getRevisor() {
    return this.http.get<any>('');
  }

  definirRevisor(revisor) {
    return this.http.put<any>('', revisor);
  }

  // Processo depois da demanda criada
  definirSuperiorDireto(DemandaValue: any) {
    return this.http.put('', DemandaValue);
  }

  especificaoTecnicaForm(especTec) {
    return this.http.post<any>('', especTec);
  }


  getDocumentoAprovacoes(id: number) {
    return this.http.get<any>('');
  }

  downloadDocAprovacoes() {
    return this.http.get<any>('');
  }

  downloadDocComplementar() {
    return this.http.get<any>('');
  }

  getForms() {
    return this.http.get<any>('Demandas/Forms');
  }

  getForm(key: string) {
    return this.http.get<FormField>(`Demandas/Forms/${key}`);
  }

  getFormValue(key: string) {
    return this.http.get<object>(`Demandas/Forms/${key}/Values`);
  }

  saveFormValue(key: string, values) {
    return this.http.post<object>(`Demandas/Forms/${key}/Values`, values);
  }


}
