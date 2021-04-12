import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ServiceBase} from '@app/services/service-base.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from '@app/services';
import {EquipePeD} from '@app/commons';

@Injectable()
export class EquipePedResolver implements Resolve<EquipePeD> {

  constructor(protected service: AppService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EquipePeD> {
    return this.service.sistema.getEquipePeD();
  }

}
