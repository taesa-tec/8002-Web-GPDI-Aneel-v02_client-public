import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandasService {


  constructor(private http: HttpClient) { }


  // Tudo sobre a Demanda
  minhasDemadas() {
    return this.http.get<any>('');
  }

  getDemandaId(id: number) {
    return this.http.get<any>(`demanda/${id}/user`);
  }

  criarDemanda(demanda: any) {
    return this.http.post('', demanda);
  }

  editarDemanda(demandaUpdate: number) {
    return this.http.put<any>('', demandaUpdate);
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


  

}
