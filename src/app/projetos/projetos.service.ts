import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProjectRequest, Projeto, ResultadoResponse, ProjetoStatus } from '../models';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  protected projetoCreatedSource = new Subject<Projeto>();

  projetoCreated = this.projetoCreatedSource.asObservable();
  status: ProjetoStatus[];

  constructor(private http: HttpClient) { }

  meusProjetos() {
    return this.http.get<Array<any>>('UserProjetos/me');
  }

  getProjetos() {
    return this.http.get<Array<Projeto>>('Projetos');
  }
  usersProjeto(id: number) {
    return this.http.get<Projeto>(`Projetos/${id}/Usuarios`);
  }

  criarProjeto(projeto: CreateProjectRequest) {
    return this.http.post<ResultadoResponse>('Projetos', projeto);
  }

  getById(id: number) {
    return this.http.get<Projeto>(`Projetos/${id}`);
  }

  editar(projeto: Projeto) {
    return this.http.put<ResultadoResponse>(`Projetos`, projeto);
  }


}
