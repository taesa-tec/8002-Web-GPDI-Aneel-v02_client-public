import {HttpClient, HttpRequest} from '@angular/common/http';
import {BaseEntity} from '@app/commons';
import {Injectable, Provider} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(protected http: HttpClient) {
  }

  upload(files: Array<File>, url: string) {

    const formData = new FormData();

    files.forEach(file =>
      formData.append('file', file, file.name)
    );

    const request = new HttpRequest('POST', url, formData);

    return this.http.request<any>(request).toPromise();
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    });
  }
}

@Injectable()
export class ServiceBase<T extends { id?: any }> extends UploadFilesService {

  static useExisting(t): Provider {
    return {
      provide: ServiceBase,
      useExisting: t
    };
  }

  static fromAppend(append): Provider {
    return {
      provide: ServiceBase,
      deps: [HttpClient],
      useFactory: (http: HttpClient) => new ServiceBase(http, append)
    };
  }

  get: (url, ...args) => Promise<any> = (url, ...args) => this.http.get(`${this.controller}/${url}`, ...args).toPromise();
  delete: (url, ...args) => Promise<any> = (url, ...args) => this.http.delete(`${this.controller}/${url}`, ...args).toPromise();
  head: (url, ...args) => Promise<any> = (url, ...args) => this.http.head(`${this.controller}/${url}`, ...args).toPromise();
  put: (url, ...args) => Promise<any> = (url, data, ...args) => this.http.put(`${this.controller}/${url}`, data, ...args).toPromise();
  post: (url, ...args) => Promise<any> = (url, data, ...args) => this.http.post(`${this.controller}/${url}`, data, ...args).toPromise();

  constructor(protected http: HttpClient, protected controller: string) {
    super(http);
  }

  sanitizeQuery(query: any) {

    if (typeof query === 'object') {
      const urlQuery = new URLSearchParams();
      const keys = Object.keys(query);
      keys.forEach(key => {
        if (query[key]) {
          urlQuery.append(key, query[key]);
        }
      });
      return `?${urlQuery.toString()}`;
    } else if (typeof query === 'string') {
      if (query.trim().substring(0, 1) !== '?') {
        query = `?${query.trim()}`;
      }
      return query.length > 1 ? query : '';
    }
    return '';
  }

  async obter<QT>(id: string, query?: string | object): Promise<QT>;
  async obter(id: number, query?: string | object): Promise<T>;
  async obter(id?: string, query?: string | object): Promise<Array<T>>;
  async obter(id: any = '', query?: string | object): Promise<any> {
    const append = this.sanitizeQuery(query);
    if (typeof id === 'number') {
      return await this.http.get<T>(`${this.controller}/${id}${append}`).toPromise();
    }
    return await this.http.get<Array<T>>(`${this.controller}/${id}${append}`).toPromise();
  }

  async listaSimples<TQ>(query?: string | object): Promise<Array<TQ>>;
  async listaSimples(query?: string | object): Promise<Array<T>> {
    return await this.obter('SimpleList', query);
  }

  /*
  async page<TQ>(page: number, query?: string | object): Promise<Pagination<TQ>>;
  async page(page: number, query?: string | object): Promise<Pagination<T>> {
    return await this.obter(`Page/${page}`, query);
  }*/

  async editar<QT>(id: string, query?: string): Promise<QT> {
    return this.obter<QT>(`${id}/Edit`, query);
  }

  async criar(data: any, query?: string | object) {
    const append = this.sanitizeQuery(query);
    return await this.http.post<T>(`${this.controller}/${append}`, data).toPromise();
  }


  async atualizar(data, query?: string | object) {
    const append = this.sanitizeQuery(query);
    return await this.http.put<T>(`${this.controller}/${append}`, data).toPromise();
  }

  async salvar(data: BaseEntity, query?: string) {
    return await ((data.id && data.id.toString() !== '0') ? this.atualizar(data, query) : this.criar(data, query));
  }

  async excluir(id: any) {
    return await this.http.delete(`${this.controller}/?id=${id}`).toPromise();
  }

  upload(files: Array<File>, url: string) {
    return super.upload(files, `${this.controller}/${url}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class EstadosService extends ServiceBase<{ id: number; nome: string; valor: string }> {
  constructor(protected http: HttpClient) {
    super(http, 'Estados');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PaisesService extends ServiceBase<{ id: number; nome: string; valor: string }> {
  constructor(protected http: HttpClient) {
    super(http, 'Paises');
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends ServiceBase<{ id: number; nome: string; valor: string }> {
  constructor(protected http: HttpClient) {
    super(http, 'Empresas');
  }
}


