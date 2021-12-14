import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EquipePeD} from '@app/commons';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EquipePedResolver implements Resolve<EquipePeD> {


  constructor(protected http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EquipePeD> {
    return this.http.get<EquipePeD>('Sistema/Equipe').toPromise();
  }

}
