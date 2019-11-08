import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(protected http: HttpClient) {
  }

  getEquipePeD() {
    return this.http.get<{ [prop: string]: any }>('Sistema/Equipe').toPromise();
  }

  setEquipePeD(equipe: object) {
    return this.http.put('Sistema/Equipe', equipe).toPromise();
  }
}
