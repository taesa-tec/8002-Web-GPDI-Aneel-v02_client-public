import {Injectable} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaptacoesService extends ServiceBase<any> {

  constructor(http: HttpClient) {
    super(http, 'Captacoes');
  }
}
