import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, timer} from 'rxjs';
import {LoginRequest, RecoverRequest, ResultadoResponse, NewpassRequest, UserRole} from '@app/commons';
import {LoginResponse} from '@app/commons';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoutesRoleMap} from '@app/routes/routes';

const storageKey = 'loggedUser';


interface Session {
  aud: string;
  iss: string;
  jti: string;
  ext: number;
  nbf: number;
  iat: number;
  role: Array<string>;
  unique_name: Array<string>;

  [prop: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected loginResponse: LoginResponse;
  protected authEventsSource: BehaviorSubject<{ type: string; data?: any }>;
  protected session: Session;

  redirectTo = '/';
  authEvent: Observable<{ type: string; data?: any }>;

  get expiration() {
    return (this.session?.exp || 0) * 1e3;
  }

  get token() {
    if (this.loginResponse && this.loginResponse) {
      return this.loginResponse.accessToken;
    }
    return false;
  }

  get isLoggedIn() {
    return (this.token && this.expiration > Date.now());
  }

  get user() {
    return this.loginResponse?.user;
  }

  get role() {
    return this.user?.role;
  }

  get roles() {
    return this.user?.role;
  }

  set user(value) {
    if (this.loginResponse) {
      this.loginResponse.user = value;
      this.setSession(this.loginResponse);
    }
  }

  constructor(private http: HttpClient, protected router: Router, public modal: NgbModal) {
    let loggedUser;
    if (localStorage.getItem(storageKey) != null) {
      loggedUser = localStorage.getItem(storageKey);
    } else if (sessionStorage.getItem(storageKey) != null) {
      loggedUser = sessionStorage.getItem(storageKey);
    }

    if (loggedUser) {
      try {
        this.loginResponse = JSON.parse(loggedUser);
        this.setSession(this.loginResponse);
        this.setRoutes(this.loginResponse.user.role);
        this.authEventsSource = new BehaviorSubject<{ type: string; data?: any }>({type: 'login', data: this.loginResponse});

      } catch (e) {
        console.error(e.message);
        this.authEventsSource = new BehaviorSubject<{ type: string; data?: any }>(null);
      }
    } else {
      this.authEventsSource = new BehaviorSubject<{ type: string; data?: any }>(null);
    }
    this.authEvent = this.authEventsSource.asObservable();
  }


  protected extractInfoToken(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  setSession(response: LoginResponse) {
    this.session = this.extractInfoToken(response.accessToken);
    if (this.loginResponse) {
      Object.assign(this.loginResponse.user, response.user);
      Object.assign(this.loginResponse, response);
    } else {
      this.loginResponse = response;
    }

  }

  async login(loginRequest: LoginRequest, remember: boolean = false) {

    const response = await this.http.post<LoginResponse>(`Login`, loginRequest).toPromise();

    const storage = remember ? localStorage : sessionStorage;

    storage.setItem(storageKey, JSON.stringify(response));

    this.setSession(response);

    if (remember) {
      sessionStorage.setItem('last_login_user', loginRequest.email);
    } else {
      sessionStorage.removeItem('last_login_user');
    }
    this.setRoutes(this.loginResponse.user.role);
    return response;
  }


  async logout(redirect?: string) {
    this.loginResponse = null;
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
    this.redirectTo = '/';
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll('logout');
    }
    this.authEventsSource.next({type: 'logout'});
    this.setRoutes('');
    this.router.onSameUrlNavigation = 'reload';
    return await this.router.navigate(['/'], {queryParams: {redirect}});
  }

  recuperarSenha(recoverRequest: RecoverRequest) {
    return this.http.post<ResultadoResponse>('Login/recuperar-senha', recoverRequest).toPromise();
  }

  async novaSenha(recoverRequest: NewpassRequest) {
    return await this.http.post<ResultadoResponse>('Login/nova-senha', recoverRequest).toPromise();
  }


  hasRoles(...roles: string[]) {
    this.userHasRoles(...roles);
  }

  userHasRoles(...roles: string[]) {
    return roles
      .reduce((p, c) => [...p, ...(Array.isArray(c) ? c : [c])], [])
      .some(role => this.user.roles.indexOf(role as UserRole) >= 0);
  }

  setRoutes(role: string) {
    if (RoutesRoleMap.has(role)) {
      this.router.resetConfig(RoutesRoleMap.get(role));
    } else {
      console.error(role);
      this.router.resetConfig(RoutesRoleMap.get(''));
    }
  }

}
