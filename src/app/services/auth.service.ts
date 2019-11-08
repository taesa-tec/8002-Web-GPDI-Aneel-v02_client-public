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


  public redirectTo = '/dashboard';
  private loginResponse: LoginResponse;

  protected authEventsSource: BehaviorSubject<{ type: string, data?: any }>;
  authEvent: Observable<{ type: string, data?: any }>;

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
        console.log('Usuário logado');
      } catch (e) {
        console.error(e.message);
        this.authEventsSource = new BehaviorSubject<{ type: string, data?: any }>(null);
      }
    } else {
      this.authEventsSource = new BehaviorSubject<{ type: string, data?: any }>(null);
    }
    this.authEvent = this.authEventsSource.asObservable();
  }

  get expiration() {
    if (this.loginResponse && this.loginResponse.expiration) {
      return new Date(this.loginResponse.expiration);
    }
    return null;
  }

  get token() {
    if (this.loginResponse && this.loginResponse.authenticated) {
      return this.loginResponse.accessToken;
    }
    return false;
  }

  get isLoggedIn() {
    return (this.token && this.expiration !== null && this.expiration.getTime() > Date.now());

  }

  login(loginRequest: LoginRequest, remember: boolean = false, redirectTo: string | null = null): Observable<LoginResponse> {
    return new Observable<LoginResponse>(rootObserver => {
      if (redirectTo) {
        this.redirectTo = redirectTo;
      }

      this.http.post<LoginResponse>(`Login`, loginRequest).subscribe(loginResponse => {
        if (loginResponse.authenticated) {
          const storage = remember ? localStorage : sessionStorage;
          this.loginResponse = loginResponse;
          storage.setItem(storageKey, JSON.stringify(loginResponse));
          this.router.navigateByUrl(this.redirectTo).then(() => {
            this.authEventsSource.next({type: 'login', data: loginResponse});
          }, error => {
            console.log(error);
          });
        }
        rootObserver.next(loginResponse);
      }, error => {
        rootObserver.error(error);
      }, () => {
        rootObserver.complete();
      });
    });
    // this.http.post(`${this.api}/login`, user);
  }

  logout(): void {
    this.loginResponse = null;
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
    this.redirectTo = '/dashboard';
    this.router.navigate(['/login']);
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
