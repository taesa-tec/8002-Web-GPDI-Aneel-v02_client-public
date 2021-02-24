import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {extractRouteParams} from '@app/core';

@Injectable()
export class ProdutosService extends ServiceBase<any> {

  set captacaoId(value) {
    this.controller = `Fornecedor/Propostas/${value}/Produtos`;
  }

  constructor(http: HttpClient) {
    super(http, 'Fornecedor/Propostas/{id}/Produtos');
  }


}
