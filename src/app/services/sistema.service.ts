import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EquipePeD} from '@app/commons';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  protected _equipePeD: EquipePeD = null;
  protected $tooltips = new Map([]);

  get equipePeD() {
    return this._equipePeD;
  }

  constructor(protected http: HttpClient) {
  }

  async getEquipePeD() {
    if (this._equipePeD === null) {
      this._equipePeD = await this.http.get<EquipePeD>('Sistema/Equipe').toPromise();
    }
    return this._equipePeD;
  }

  setEquipePeD(equipe: object) {
    this._equipePeD = null;
    return this.http.put('Sistema/Equipe', equipe).toPromise();
  }

  async getTooltip(cod: string) {
    if (!this.$tooltips.has(cod)) {
      const tooltip = await this.http.get<any>(`Ajuda/${cod}`).toPromise();
      this.$tooltips.set(cod, tooltip);
    }

    return this.$tooltips.get(cod);
  }
}
