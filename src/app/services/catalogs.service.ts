import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empresa, ProjetoStatus, Segmento, TiposCompartilhamento, TextValue, Permissao} from '@app/models';
import {of, Observable} from 'rxjs';
import {map, share, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  protected cache = new Map<string, any>();

  constructor(private http: HttpClient) {
    console.log('CatalogsService OK');
  }

  protected async getData<T>(key: string, url: string) {

    const cached = this.cache.get(key);

    if (cached) {
      return cached;
    }
    const result = await this.http.get<T>(url).toPromise();
    this.cache.set(key, result);
    return result;
  }

  async permissoes() {
    return await this.getData<Array<Permissao>>('permissoes', `catalogs/permissoes`);
  }

  async empresas() {
    return await this.getData<Array<Empresa>>('empresas', `catalogs/empresas`);
  }

  async empresa(id: number) {
    return (await this.empresas()).find(e => e.id === id);
  }

  async status() {
    return await this.getData<Array<ProjetoStatus>>('status', `catalogs/status`);
  }

  async segmentos() {
    return await this.getData<Array<Segmento>>('segmentos', `catalogs/segmentos`);
  }

  async temas() {
    return await this.getData<any>('temas', `catalogs/temas`);
  }

  async estados() {
    return await this.getData<any>('estados', `catalogs/Estados`);
  }

  async categoriasContabeisGestao() {
    return await this.getData<Array<any>>('categoriasContabeisGestao', `catalogs/categoriascontabeisgestao`);
  }

  async paises() {
    return await this.getData<Array<{ id: number; nome: string; }>>('paises', `catalogs/Paises`);
  }

  tipoCompartilhamento() {
    return TiposCompartilhamento;
  }

  async produtoFasesCadeia() {
    return await this.getData<Array<{ id: number; nome: string; }>>('produtoFasesCadeia', `catalogs/ProdutoFasesCadeia`);
  }
}
