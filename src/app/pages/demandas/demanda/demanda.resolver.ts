import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {Injectable} from '@angular/core';
import {DemandasService} from '@app/services';

@Injectable()
export class DemandaResolver implements Resolve<Demanda> {
  constructor(protected service: DemandasService, protected router: Router) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Demanda> {
    const demanda = await this.service.getDemanda(parseFloat(route.params.id));
    if (demanda) {
      this.service.setDemanda(demanda);
      return demanda;
    }
    await this.router.navigate(['/demandas']);
  }
}
