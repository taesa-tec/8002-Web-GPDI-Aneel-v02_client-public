import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components';
import {FormBuilder, Validators} from '@angular/forms';
import {environment} from '@env/environment';
import {AuthService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppValidators} from '@app/commons';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  errorMessage: string;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, AppValidators.strongPass(null, false)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: formCtrl => formCtrl.value.password !== formCtrl.value.confirmPassword ? {passwordConfirme: true} : null
  });

  remember = !environment.production;

  constructor(protected auth: AuthService,
              private router: Router,
              protected fb: FormBuilder,
              protected activatedRoute: ActivatedRoute,
              protected http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  async requestInstall() {
    console.log('request');
    if (this.form.valid) {
      try {
        this.loading.show();
        await this.http.post('/api/Sistemal/Install', this.form.value).toPromise();
      } catch (_) {
        console.error(_);
      } finally {
        this.loading.hide();
      }

    }
  }
}
