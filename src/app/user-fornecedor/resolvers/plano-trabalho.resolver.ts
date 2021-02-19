import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';

@Injectable()
export class PlanoTrabalhoResolver implements Resolve<any> {

  constructor(protected service: PropostasService, protected router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const params = extractRouteParams(route);
    if (params.id) {
      try {
        const result = await this.service.getPlanoTrabalho(params.id);
        if (result !== null) {
          return result;
        }
      } catch (e) {
        console.log(e);
      }
    }
    await this.router.navigate(['/fornecedor', 'propostas']);
  }

}
