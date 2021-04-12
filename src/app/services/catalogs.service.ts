import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empresa, ProjetoStatus, Segmento, TiposCompartilhamento, Permissao} from '@app/commons';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  protected cache = new Map<string, any>();

  constructor(private http: HttpClient) {
    console.log('CatalogsService OK');
  }

  protected async getData<T>(key: string, url: string) {

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = await this.http.get<T>(url).toPromise();
    this.cache.set(key, result);
    return result;
  }

  async empresas() {
    return await this.getData<Array<Empresa>>('empresas', `Empresas`);
  }

  async empresa(id: number) {
    console.warn('atualizar metodo de busca de empresa');
    return (await this.empresas()).find(e => e.id === id);
  }

  async status() {
    console.warn('Status de projeto usado');
    return await this.getData<Array<ProjetoStatus>>('status', `Catalogo/status`);
  }

  async segmentos() {
    return await this.getData<Array<Segmento>>('segmentos', `Catalogo/segmentos`);
  }

  async temas() {
    return await this.getData<any>('temas', `Catalogo/Temas`);
  }

  async estados() {
    return await this.getData<any>('estados', `Catalogo/Estados`);
  }

  async categoriasContabeisGestao() {
    return await this.getData<Array<any>>('categoriasContabeisGestao', `Catalogo/categoriascontabeisgestao`);
  }

  async categoriasContabeis() {
    return await this.getData<Array<any>>('categoriasContabeis', `Catalogo/CategoriaContabil`);
  }

  async produtoTipos() {
    return await this.getData<Array<any>>('produtoTipos', `Catalogo/ProdutoTipo`);
  }

  async categoriasContabeisAtividade() {
    return await this.getData<Array<any>>('categoriasContabeisAtividade', `Catalogo/CategoriaContabilAtividade`);
  }

  async paises() {
    return await this.getData<Array<{ id: number; nome: string }>>('paises', `Catalogo/Paises`);
  }


  tipoCompartilhamento() {
    return TiposCompartilhamento;
  }

  async produtoFasesCadeia() {
    return await this.getData<Array<{ id: number; nome: string }>>('produtoFasesCadeia', `Catalogo/ProdutoFaseCadeia`);
  }
}
