import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {DemandasService} from '@app/services';
import {DemandaEtapaStatus} from '@app/pages/demandas/commons';

@Injectable()
export class DemandasResolver implements Resolve<Demanda[]> {
  constructor(protected service: DemandasService) {
  }


  async getDemandas(status: DemandaEtapaStatus | 'Captacao' | string) {


    let _status: 'Reprovadas' | 'Aprovadas' | 'EmElaboracao' | 'Captacao' = 'EmElaboracao';

    switch (status) {
      case DemandaEtapaStatus.EmElaboracao:
        _status = 'EmElaboracao';
        break;
      case DemandaEtapaStatus.ReprovadaPermanente:
      case DemandaEtapaStatus.Reprovada:

        _status = 'Reprovadas';
        break;
      case DemandaEtapaStatus.Aprovada:
        _status = 'Aprovadas';
        break;
      case 'Captacao':
        _status = 'Captacao';

    }
    return await this.service.getDemandasByStatus(_status);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Demanda[]> {
    if (route.data.demandaEtapaCaptacao) {
      return this.getDemandas('Captacao');
    }
    return this.getDemandas(route.data.demandaEtapaStatus);
  }

}
