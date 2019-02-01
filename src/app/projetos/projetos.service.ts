import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProjectRequest, Projeto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {


  constructor(private http: HttpClient) { }

  meusProjetos() {
    return this.http.get<Array<any>>('UserProjetos/me');
  }

  getProjetos() {
    return this.http.get<Array<any>>('Projetos');
  }

  criarProjeto(projeto: CreateProjectRequest) {
    return this.http.post('Projetos', projeto);
  }

  getById(id: number) {
    return this.http.get<Projeto>(`Projetos/${id}`);
  }

}
