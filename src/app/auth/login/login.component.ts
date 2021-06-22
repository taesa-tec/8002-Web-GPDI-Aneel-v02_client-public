import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequest, UserRole} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  errorMessage: string;
  form = this.fb.group({
    email: [sessionStorage.getItem('last_login_user'), [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  remember = !environment.production;

  constructor(protected authService: AuthService,
              private router: Router,
              protected fb: FormBuilder,
              protected activatedRoute: ActivatedRoute,
              protected cdr: ChangeDetectorRef) {
  }

  async doLogin() {
    if (this.form.invalid) {
      return;
    }

    this.loading.show();
    this.errorMessage = null;
    try {
      const response = await this.authService.login(this.form.value, this.remember);

      if (response.accessToken) {
        const redirect = this.activatedRoute.snapshot.queryParams.redirect || '/';
        await this.router.navigateByUrl(redirect);
      }
    } catch (e) {
      if (e.error) {
        this.errorMessage = e.error.detail;
      } else {
        this.errorMessage = e.message;
      }
    } finally {
      this.form.get('password').setValue('');
      this.loading.hide();
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
  }
}
