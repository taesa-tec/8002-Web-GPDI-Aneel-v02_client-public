import { Injectable, Inject } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../core/shared/entry-components/alert/alert.component';
import { ConfirmComponent } from '../core/shared/entry-components/confirm/confirm.component';
import { CatalogsService } from '@app/services/catalogs.service';
import { ProjetosService } from '@app/services/projetos.service';
import { AuthService } from '@app/services/auth.service';
import { FileService } from '@app/services/file.service';
import { UsersService } from '@app/services/users.service';
import { PromptComponent } from '../core/shared/entry-components/prompt/prompt.component';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { ModalPageComponent } from '@app/core/shared/entry-components/modal-page/modal-page.component';
import { DemandasService } from './demandas.service';
import { BehaviorSubject, timer } from 'rxjs';
import { SistemaService } from '@app/services/sistema.service';
import { FileUploaderComponent } from '@app/core/shared/entry-components/file-uploader/file-uploader.component';


class LoadingController {

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
  loading: LoadingController;

  constructor(
    public modal: NgbModal,
    public catalogo: CatalogsService,
    public projetos: ProjetosService,
    public demandas: DemandasService,
    public users: UsersService,
    public file: FileService,
    public auth: AuthService,
    public sistema: SistemaService,
    public router: Router,
    public modalConfig: NgbModalConfig
  ) {
    this.loading = new LoadingController();
    this.config = environment;
    this.modalConfig.backdrop = 'static';
  }

  alert(message: string | Array<string>, title: string = 'Alerta') {
    const ref = this.modal.open(AlertComponent, { backdrop: 'static' });
    ref.componentInstance.title = title;
    ref.componentInstance.setMessage(message);
    return ref.result;
  }

  confirm(message: string, title: string = 'Confirme',
    options: { text: string, value: any, cssClass: string }[] =
      [
        { text: 'Cancelar', value: false, cssClass: 'btn btn-link' },
        { text: 'Ok', value: true, cssClass: 'btn-primary' }
      ]) {
    const ref = this.modal.open(ConfirmComponent, { backdrop: 'static' });
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    ref.componentInstance.options = options;
    return ref.result;
  }

  prompt(message: string, title: string = 'Confirme') {
    const ref = this.modal.open(PromptComponent, { backdrop: 'static' });
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    return ref.result;
  }

  uploadForm(selecteds: Array<any> = [], path: string = 'File') {
    const ref = this.modal.open(FileUploaderComponent, { backdrop: 'static', size: 'lg' });
    const cmp = (ref.componentInstance as FileUploaderComponent);
    cmp.pathUpload = path;
    cmp.preSelected = selecteds;
    cmp.app = this;

    return ref.result;
  }

  showLoading(timeOrPromise: Promise<any> | number | null = null) {
    this.loading.show(timeOrPromise);
  }

  hideLoading() {
    this.loading.hide();
  }

  openPage(pageName) {
    const ref = this.modal.open(ModalPageComponent, { backdrop: 'static', size: 'lg' });
    const component = <ModalPageComponent>ref.componentInstance;
    try {
      component.setPage(pageName);
    } catch (e) {
      ref.dismiss(e);
      this.alert(e.message);
    }

    return ref.result;
  }
}

