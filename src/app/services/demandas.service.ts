import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Demanda, FormField} from '@app/models/demandas';
import {map} from 'rxjs/operators';

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

  getSuperiorDireto(id: number) {
    return this.http.get<{ superiorDireto: string }>(`Demandas/${id}/EquipeValidacao`).toPromise();
  }

  setSuperiorDireto(id: number, data: object) {
    return this.http.put<any>(`Demandas/${id}/EquipeValidacao`, data).toPromise();
  }

  async getAnexos(id: number) {
    return await this.http.get<Array<any>>(`Demandas/${id}/File/`).toPromise();
  }

  async downloadAnexo(demandaId: number, file) {
    const blob = await this.http.get(`Demandas/${demandaId}/File/${file.id}`, {
      responseType: 'blob'
    }).toPromise();

    const a = document.createElement('a');
    const blobUrl = URL.createObjectURL(blob);
    // PQP que gambiarra
    a.href = blobUrl;
    a.setAttribute('download', file.name);
    a.click();
    URL.revokeObjectURL(blobUrl);
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
