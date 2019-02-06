import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa, ProjetoStatus, Segmentos, ProjetoCompartilhamento } from '@app/models';
import { of, Observable } from 'rxjs';
import { map, share, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {


  protected data: { [propName: string]: any } = {};
  protected observables: { [propName: string]: Observable<any> } = {};

  constructor(private http: HttpClient) { }

  protected getData<T>(key: string, url: string): Observable<T> {
    if (this.data[key]) {
      return of(this.data[key]);
    } else if (this.observables[key]) {
      return this.observables[key];
    } else {
      this.observables[key] = this.http.get<T>(url)
        .pipe(
          map(r => {
            this.data[key] = r; return r;
          }),
          share()
        );
      return this.observables[key];
    }
  }

  permissoes() {
    return this.getData<any>('permissoes', `catalogs/permissoes`);
  }

  empresas() {
    return this.getData<Array<Empresa>>('empresas', `catalogs/empresas`);
    // return this.http.get<Array<Empresa>>(`catalogs/empresas`);
  }
  empresa(id: number) {
    return this.empresas().pipe(map(empresas => empresas.find(e => e.id === id)));
  }

  status() {
    return this.getData<Array<ProjetoStatus>>('status', `catalogs/status`);
    // return this.http.get<Array<ProjetoStatus>>(`catalogs/status`);
  }

  segmentos() {
    return of([
      { nome: "Geração", valor: Segmentos.Geracao },
      { nome: "Transmissão", valor: Segmentos.Transmissao },
      { nome: "Distribuição", valor: Segmentos.Distribuicao },
      { nome: "Comercialização", valor: Segmentos.Comercializacao }
    ]);
    // return this.getData<any>('segmentos', `catalogs/segmentos`);
    // return this.http.get(`catalogs/segmentos`);
  }

  temas() {
    return this.getData<any>('temas', `catalogs/temas`);
    // return this.http.get(`catalogs/temas`);
  }

  estados() {
    return this.getData<any>('estados', `catalogs/Estados`);
    // return this.http.get(`catalogs/Estados`);
  }

  tipoCompartilhamento() {
    return of<Array<{ nome: string, valor: ProjetoCompartilhamento }>>([
      { nome: "Domínio Público", valor: ProjetoCompartilhamento.DominioPublico },
      { nome: "Exclusivo da(s) empresa(s) de energia elétrica", valor: ProjetoCompartilhamento.ExclusivoEmpresaEletrica },
      { nome: "Exclusivo da(s) entidade(s) executora(s)", valor: ProjetoCompartilhamento.ExclusivoEmpresaExecutora },
      {
        nome: "Compartilhado entre as empresa(s) de energia elétrica e entidade(s) executora(s)",
        valor: ProjetoCompartilhamento.Compartilhado
      },

    ]);
  }
}
