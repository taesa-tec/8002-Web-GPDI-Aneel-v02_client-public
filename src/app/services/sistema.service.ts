import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EquipePeD} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  protected _equipePeD: EquipePeD = null;

  get equipePeD() {
    return this._equipePeD;
  }

  constructor(protected http: HttpClient) {
    //this.getEquipePeD();
  }

  async getEquipePeD() {
    if (this._equipePeD === null) {
      this._equipePeD = await this.http.get<EquipePeD>('Sistema/Equipe').toPromise();
    }
    return Promise.resolve<EquipePeD>(this._equipePeD);
  }

  setEquipePeD(equipe: object) {
    return this.http.put('Sistema/Equipe', equipe).toPromise();
  }
}
