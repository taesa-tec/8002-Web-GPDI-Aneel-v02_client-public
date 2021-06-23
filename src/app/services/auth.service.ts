import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {LoginRequest, RecoverRequest, ResultadoResponse, NewpassRequest, UserRole, User} from '@app/commons';
import {LoginResponse} from '@app/commons';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoutesRoleMap} from '@app/routes/routes';

const storageKey = 'userSession';

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
  providedIn: 'root',
})
export class AuthService {
  protected session: Session;
  protected $currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  protected $error: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected $token = null;
  user = this.$currentUser.asObservable();
  error = this.$error.asObservable();
  redirectTo = '/';

  get expiration() {
    return (this.session?.exp || 0) * 1e3;
  }

  get token() {
    return this.$token;
  }

  get isLoggedIn() {
    return (this.token && this.expiration > Date.now());
  }

  get role() {
    return this.getUser()?.role;
  }

  get roles() {
    return this.getUser()?.role;
  }

  constructor(private http: HttpClient, protected router: Router, public modal: NgbModal) {
    this.init().then(() => this.syncUserInfo());
  }

  protected getStorageUser() {
    let storageUser = null;
    if (localStorage.getItem(storageKey) != null) {
      storageUser = localStorage.getItem(storageKey);
    } else if (sessionStorage.getItem(storageKey) != null) {
      storageUser = sessionStorage.getItem(storageKey);
    }
    if (storageUser) {
      try {
        return JSON.parse(storageUser);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  }

  protected extractInfoToken(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  async init() {
    const storageUser = this.getStorageUser();

    if (storageUser) {
      try {
        this.setSession(storageUser);
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  async syncUserInfo() {
    if (this.isLoggedIn) {
      const user = await this.http.get<User>('Me').toPromise();
      this.setUser(user);
    }
  }

  setUser(user: User) {
    this.$currentUser.next(user);
  }

  getUser() {
    return this.$currentUser.getValue();
  }

  setSession(response: LoginResponse) {
    this.$token = response.accessToken;
    this.session = this.extractInfoToken(this.token);
    this.setUser(response.user);
    this.setRoutes(this.getUser().role);
  }

  clearSession() {
    this.$token = null;
    this.session = null;
    this.setUser(null);
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
  }

  async login(loginRequest: LoginRequest, remember: boolean = false) {

    try {

      const response = await this.http.post<LoginResponse>(`Login`, loginRequest).toPromise();

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem(storageKey, JSON.stringify(response));

      this.setSession(response);

      if (remember) {
        sessionStorage.setItem('last_login_user', loginRequest.email);
      } else {
        sessionStorage.removeItem('last_login_user');
      }
      this.$error.next(null);
      return true;
    } catch (e) {
      this.$error.next(e);
      return false;
    }

  }


  async logout(redirect?: string) {
    this.redirectTo = '/';
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll('logout');
    }
    this.clearSession();
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
      .some(role => this.getUser().roles.indexOf(role as UserRole) >= 0);
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
