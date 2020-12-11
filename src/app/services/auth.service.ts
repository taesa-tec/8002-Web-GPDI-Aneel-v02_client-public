import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, timer} from 'rxjs';
import {LoginRequest, RecoverRequest, ResultadoResponse, NewpassRequest} from '@app/models';
import {LoginResponse} from '@app/models';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

const storageKey = 'loggedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected loginResponse: LoginResponse;
  protected authEventsSource: BehaviorSubject<{ type: string, data?: any }>;

  redirectTo = '/dashboard';
  authEvent: Observable<{ type: string, data?: any }>;

  get expiration() {
    if (this.loginResponse && this.loginResponse.expiration) {
      return new Date(this.loginResponse.expiration);
    }
    return null;
  }

  get token() {
    if (this.loginResponse && this.loginResponse) {
      return this.loginResponse.accessToken;
    }
    return false;
  }

  get isLoggedIn() {
    return (this.token && this.expiration !== null && this.expiration.getTime() > Date.now());

  }

  get user() {
    if (this.isLoggedIn) {
      return this.loginResponse.user;
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
        this.authEventsSource = new BehaviorSubject<{ type: string, data?: any }>({type: 'login', data: this.loginResponse});
      } catch (e) {
        console.error(e.message);
        this.authEventsSource = new BehaviorSubject<{ type: string, data?: any }>(null);
      }
    } else {
      this.authEventsSource = new BehaviorSubject<{ type: string, data?: any }>(null);
    }
    this.authEvent = this.authEventsSource.asObservable();
  }


  async login(loginRequest: LoginRequest, remember: boolean = false, redirectTo: string | null = null) {
    if (redirectTo) {
      this.redirectTo = redirectTo;
    } else {
      this.redirectTo = '/dashboard';
    }
    const loginResponse = await this.http.post<LoginResponse>(`Login`, loginRequest).toPromise();
    const storage = remember ? localStorage : sessionStorage;

    if (remember) {
      sessionStorage.setItem('last_login_user', loginRequest.email);
    } else {
      sessionStorage.removeItem('last_login_user');
    }
    this.loginResponse = loginResponse;
    storage.setItem(storageKey, JSON.stringify(loginResponse));
    await this.router.navigateByUrl(this.redirectTo);
    return this.loginResponse;
  }

  logout(): void {
    this.loginResponse = null;
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
    this.redirectTo = '/dashboard';
    this.router.navigate(['/login']).then();
    if (this.modal.hasOpenModals()) {
      this.modal.dismissAll('logout');
    }
    this.authEventsSource.next({type: 'logout'});
  }

  recuperarSenha(recoverRequest: RecoverRequest): Observable<ResultadoResponse> {
    return this.http.post<ResultadoResponse>('Login/recuperar-senha', recoverRequest);
  }

  novaSenha(recoverRequest: NewpassRequest): Observable<ResultadoResponse> {
    return this.http.post<ResultadoResponse>('Login/nova-senha', recoverRequest);
  }


}
