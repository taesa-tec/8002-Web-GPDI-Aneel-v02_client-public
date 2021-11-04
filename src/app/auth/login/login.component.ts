import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class LoginComponent implements OnInit, AfterViewInit {


  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  @ViewChild('email') inputEmail: ElementRef<HTMLInputElement>;
  @ViewChild('password') inputPass: ElementRef<HTMLInputElement>;

  errorMessage: string;
  form = this.fb.group({
    email: [sessionStorage.getItem('last_login_user') ?? '', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  remember = !environment.production;

  constructor(protected auth: AuthService,
              private router: Router,
              protected fb: FormBuilder,
              protected activatedRoute: ActivatedRoute,
              protected cdr: ChangeDetectorRef) {
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

  ngAfterViewInit(): void {
    if (this.form.value.email.length > 0) {
      this.inputPass.nativeElement.focus();
    } else {
      this.inputEmail.nativeElement.focus();
    }
  }

  async doLogin() {
    if (this.form.invalid) {
      return;
    }

    this.loading.show();
    this.errorMessage = null;
    await this.auth.login(this.form.value, this.remember);

    this.form.get('password').setValue('');
    this.loading.hide();
    this.cdr.detectChanges();

  }
}
