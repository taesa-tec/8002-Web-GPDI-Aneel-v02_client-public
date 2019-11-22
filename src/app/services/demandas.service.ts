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

  demandaExist(id: number) {
    return this.http.head(`Demandas/${id}`).toPromise();
  }

  getDemanda(id: number) {
    return this.http.get<any>(`Demandas/${id}`);
  }

  getDemandaForm(id: number, key: string) {
    return this.http.get<any>(`Demandas/${id}/Form/${key}`);
  }

  criarDemanda(titulo: any) {
    return this.http.post('Demandas/Criar', `"${titulo}"`, {headers: {'Content-Type': 'application/json'}}).toPromise();
  }

  getSuperiorDireto(id: number) {
    return this.http.get<{ superiorDireto: string }>(`Demandas/${id}/EquipeValidacao`).toPromise();
  }

  setSuperiorDireto(id: number, data: object) {
    return this.http.put<any>(`Demandas/${id}/EquipeValidacao`, data).toPromise();
  }

  definirRevisor(id: number, data: object) {
    return this.http.put<any>(`Demandas/${id}/Revisor`, data).toPromise();
  }

  enviarCaptacao(id: number) {
    return this.http.put<any>(`Demandas/${id}/Captacao`, {}).toPromise();
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

  proximaEtapa(id: number, data) {

    return this.http.put<any>(`Demandas/${id}/ProximaEtapa`, data).toPromise();
  }

  excluir(id: number) {
    return this.http.delete<any>(`Demandas/${id}/`);
  }

  reprovarDemanda(id: number, motivo: any) {
    return this.http.put<any>(`Demandas/${id}/Reiniciar`, {motivo}).toPromise();
  }

  reprovarPermanente(id: number, motivo: any) {
    return this.http.put<any>(`Demandas/${id}/ReprovarPermanente`, {motivo}).toPromise();
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

  setEtapa(id: number, data: object) {
    return this.http.put<any>(`Demandas/${id}/Etapa`, data).toPromise();
  }

}
