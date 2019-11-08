import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Demanda} from '@app/models/demandas';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from '@app/services/app.service';

@Injectable({providedIn: 'root'})
export class DemandaResolver implements Resolve<Demanda> {
  constructor(protected app: AppService) {

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Demanda> | Promise<Demanda> | Demanda {
    return this.app.demandas.getDemanda(parseFloat(route.paramMap.get('id'))).toPromise();
  }
}
