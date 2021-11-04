import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemaStatusResolver implements Resolve<{ installed: boolean }> {

  constructor(protected http: HttpClient) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ installed: boolean }> {
    try {
      return await this.http.get<{ installed: boolean }>('/api/Sistema/Status').toPromise();
    } catch (e) {
      return null;
    }
  }

}
