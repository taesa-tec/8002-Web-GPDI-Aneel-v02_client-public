import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequest, UserRole} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {environment} from '../../../environments/environment';
import {RootsUrl} from '@app/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  errorMessage: string;

  loginRequest: LoginRequest = {
    email: sessionStorage.getItem('last_login_user'),
    password: ''
  };

  remember = !environment.production;

  constructor(protected authService: AuthService, private router: Router,
              protected activatedRoute: ActivatedRoute) {
  }

  getHomeUrl(role) {
    const path = RootsUrl.has(role) ? RootsUrl.get(role) : 'error';
    return `/${path}`;
  }

  async doLogin(event) {

    event.preventDefault();

    this.loading.show();
    this.errorMessage = null;
    try {
      const response = await this.authService.login(this.loginRequest, this.remember);
      if (response.accessToken) {
        const redirect = this.activatedRoute.snapshot.queryParams.redirect || this.getHomeUrl(response.user.role);
        await this.router.navigateByUrl(redirect);
      }
    } catch (e) {
      if (e.error) {
        this.errorMessage = e.error.detail;
      } else {
        this.errorMessage = e.message;
      }
      console.error(e);
    } finally {
      this.loading.hide();
    }
  }

  ngOnInit(): void {

  }
}
