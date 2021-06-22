import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '@app/services/app.service';

@Injectable()
export class DemandaGuard implements CanActivate {
  constructor(protected app: AppService) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (next.params['id']) {

      try {
        await this.app.demandas.demandaExist(parseFloat(next.params['id']));
        return true;
      } catch (e) {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 403) {
            this.app.alert('Você não tem permissão para visualizar essa demanda');
          } else if (e.status === 404) {
            this.app.alert('Demanda Não encontrada');
          }
          await this.app.router.navigate(['/']);
        }
        return false;
      }
    }
    return false;


  }

}
