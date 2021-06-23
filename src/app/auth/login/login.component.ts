import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequest, UserRole} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {filter} from 'rxjs/operators';

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

  constructor(protected auth: AuthService,
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
    const loggein = await this.auth.login(this.form.value, this.remember);
    if (loggein) {
      await this.router.navigate(['./'], {relativeTo: this.activatedRoute});
    }
    this.form.get('password').setValue('');
    this.loading.hide();
    this.cdr.detectChanges();

  }


  ngOnInit(): void {
    this.auth.error.pipe(filter(e => e != null)).subscribe(e => {
      if (e.error) {
        this.errorMessage = e.error.detail;
      } else {
        this.errorMessage = e.message;
      }
    });

  }
}
