import {Injectable, Inject} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from '../core/components/alert/alert.component';
import {ConfirmComponent, ConfirmComponentOption} from '../core/components/confirm/confirm.component';
import {CatalogsService} from '@app/services/catalogs.service';
import {AuthService} from '@app/services/auth.service';
import {FileService} from '@app/services/file.service';
import {PromptComponent} from '../core/components/prompt/prompt.component';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {DemandasService} from './demandas.service';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {SistemaService} from '@app/services/sistema.service';
import {FileUploaderComponent} from '@app/core/components/file-uploader/file-uploader.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorComponent} from '@app/core/screens/error.component';
import {RoutesRoleMap} from '@app/routes';


@Injectable({
  providedIn: 'root'
})
export class LoadingController {

  private loadingSource = new BehaviorSubject(false);

  observable = this.loadingSource.asObservable();

  protected _promises: Array<Promise<any>> = [];

  protected _isShowing = false;

  get isShowing() {
    return this._isShowing;
  }

  async show(timeOrPromise: Promise<any> | number | null = null) {
    if (!this._isShowing || timeOrPromise !== null) {
      this._isShowing = true;
      this.loadingSource.next(true);
      if (typeof timeOrPromise === 'number' && timeOrPromise > 0) {
        timer(timeOrPromise).subscribe(n => this.hide());
      } else if (timeOrPromise instanceof Promise) {
        this._promises.push(timeOrPromise);
        try {
          await timeOrPromise;
        } catch (error) {
          console.error(error);
        }
        this._promises.pop();
        this.hide();
      }
    }
    return this;
  }

  hide() {
    if (this._isShowing && this._promises.length === 0) {
      this._isShowing = false;
      this.loadingSource.next(false);
    }
    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  moment: any;
  config: any;
  userSubscription: Subscription;
  protected isInstalled = false;


  constructor(
    public modal: NgbModal,
    public catalogo: CatalogsService,
    public demandas: DemandasService,
    public file: FileService,
    public auth: AuthService,
    public sistema: SistemaService,
    public router: Router,
    public modalConfig: NgbModalConfig,
    public loading: LoadingController
  ) {
    this.config = environment;
    this.modalConfig.backdrop = 'static';
  }

  alert(message: string | Array<string>, title: string = 'Alerta') {
    const ref = this.modal.open(AlertComponent, {backdrop: 'static'});
    ref.componentInstance.title = title;
    ref.componentInstance.setMessage(message);
    return ref.result;
  }

  async alertError(message: string | Array<string> | HttpErrorResponse, title: string = 'Error') {
    const ref = this.modal.open(AlertComponent, {backdrop: 'static'});
    ref.componentInstance.title = title;
    ref.componentInstance.className = 'border-danger';
    if (message instanceof HttpErrorResponse) {
      if (message.error) {
        const err = message.error;
        if (err.errors && Object.keys(err.errors).length > 0) {
          const msgs = Object.keys(err.errors).map(k => err.errors[k]).reduce((p, c) => [...p, ...c], []);
          ref.componentInstance.setMessage(msgs);
        } else if (err instanceof Blob) {
          const msg = await err.text();
          if (err.type.endsWith('json')) {
            const obj = JSON.parse(msg);
            ref.componentInstance.setMessage(obj.detail);
          } else {
            ref.componentInstance.setMessage(msg);
          }

        } else if (err.detail) {
          ref.componentInstance.setMessage(err.detail);
        }
      }
    } else {
      ref.componentInstance.setMessage(message);
    }
    return ref.result;
  }


  confirm(message: string, title: string = 'Confirme',
          options: Array<ConfirmComponentOption> =
            [
              {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
              {text: 'Ok', value: true, cssClass: 'btn-primary'}
            ], size: 'sm' | 'lg' | 'xl' | string = 'lg') {
    const ref = this.modal.open(ConfirmComponent, {backdrop: 'static', size});
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    ref.componentInstance.options = options;
    return ref.result;
  }

  prompt(message: string, title: string = 'Confirme') {
    const ref = this.modal.open(PromptComponent, {backdrop: 'static'});
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    return ref.result;
  }

  uploadForm(selecteds: Array<any> = [], path: string = 'File', multi = true) {
    const ref = this.modal.open(FileUploaderComponent, {backdrop: 'static', size: 'lg'});
    const cmp = (ref.componentInstance as FileUploaderComponent);
    cmp.pathUpload = path;
    cmp.preSelected = selecteds;
    cmp.isMulti = multi;
    cmp.app = this;

    return ref.result;
  }

  showLoading(timeOrPromise: Promise<any> | number | null = null) {
    this.loading.show(timeOrPromise);
  }

  hideLoading() {
    this.loading.hide();
  }

  //

  setInstalled() {
    this.isInstalled = true;
    if (!this.userSubscription) {
      this.userSubscription = this.auth.user.subscribe(user => {
        this.updateRoutes();
      });
    }
  }

  forceRefresh() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(location.pathname).then();
  }

  updateRoutes() {
    if (this.isInstalled) {
      if (this.auth.isLoggedIn) {
        this.userRoutes();
      } else {
        this.authRoutes();
      }
    } else {
      this.installerRoutes();
    }
    this.forceRefresh();
  }

  authRoutes() {
    this.router.resetConfig([{path: '', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)}]);
  }

  installerRoutes() {
    this.router.resetConfig([{path: '', loadChildren: () => import('../installer/installer.module').then(m => m.InstallerModule)}]);
  }

  errorRoutes() {
    this.router.resetConfig([{path: '**', component: ErrorComponent}]);
  }

  userRoutes() {
    const role = this.auth.role;
    if (RoutesRoleMap.has(role)) {
      const routes = RoutesRoleMap.get(role);
      this.router.resetConfig(routes);
    } else {
      console.error(`Rotas para ${role} não disponíveis`);
      this.auth.logout();
    }
  }


}

