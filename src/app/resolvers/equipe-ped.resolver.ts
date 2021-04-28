import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SistemaService} from '@app/services';
import {EquipePeD} from '@app/commons';

@Injectable()
export class EquipePedResolver implements Resolve<EquipePeD> {

  constructor(protected service: SistemaService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EquipePeD> {
    return this.service.getEquipePeD();
  }

}
