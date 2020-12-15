import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContratosService extends ServiceBase<any> {
  constructor(http: HttpClient) {
    super(http, 'Sistema/Contratos');
  }
}
