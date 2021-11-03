import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemaStatusResolver implements Resolve<{ installed: boolean }> {

  constructor(protected http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ installed: boolean }> {
    return this.http.get<{ installed: boolean }>('/api/Sistema/Status').toPromise();
  }

}
