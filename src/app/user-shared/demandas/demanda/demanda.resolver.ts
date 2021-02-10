import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {Injectable} from '@angular/core';
import {DemandasService} from '@app/services';

@Injectable()
export class DemandaResolver implements Resolve<Demanda> {
  constructor(protected service: DemandasService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Demanda> {
    return this.service.getDemanda(parseFloat(route.params.id)).toPromise();
  }

  /*
  protected defaultPage(demanda: Demanda, equipe): string {
    switch () {
      case demanda.criadorId:
        if (demanda.superiorDiretoId) {
          return 'formulario/especificacao-tecnica';
        } else {
          return 'equipe-validacao';
        }
      case demanda.superiorDiretoId:
      case demanda.revisorId:
      case equipe.coordenador.id:
      case equipe.diretor.id:
      case equipe.gerente.id:
        return demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico';
      default:
        return demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico';
    }
  }

   */
}
