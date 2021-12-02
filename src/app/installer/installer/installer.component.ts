import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService, AuthService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppValidators} from '@app/commons';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styles: ['form{max-width: 600px}']
})
export class InstallerComponent {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  errorMessage: string;
  form = this.fb.group({
    nomeCompleto: ['', Validators.required],
    cargo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, AppValidators.strongPass(null, false)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: formCtrl => formCtrl.value.password !== formCtrl.value.confirmPassword ? {passwordConfirme: true} : null
  });
  errors: { [prop: string]: string[] } = null;


  constructor(protected auth: AuthService,
              private app: AppService,
              protected fb: FormBuilder,
              protected activatedRoute: ActivatedRoute,
              protected http: HttpClient
  ) {
  }

  async requestInstall() {
    if (this.form.valid) {
      this.errors = null;
      try {
        this.loading.show();

        await this.http.post('Sistema/Install', this.form.value).toPromise();

        this.app.alert('Usuário administrativo cadastrado com sucesso').then();
        this.app.setInstalled();
        this.app.updateRoutes();
      } catch (_) {
        const {error} = _;
        if (error) {
          if (typeof error === 'string') {
            this.app.alertError(error).then();
          } else {
            const {errors} = _.error;
            this.errors = errors;
          }
        }
      } finally {
        this.loading.hide();
      }

    }
  }
}
