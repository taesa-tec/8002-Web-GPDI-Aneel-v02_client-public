import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {LoginRequest} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {environment} from '../../../environments/environment';


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

  constructor(protected authService: AuthService, private router: Router) {
  }

  async doLogin(event) {

    event.preventDefault();

    this.loading.show();
    this.errorMessage = null;
    try {
      await this.authService.login(this.loginRequest, this.remember);
    } catch (e) {
      this.errorMessage = e.message;
    } finally {
      this.loading.hide();
    }
  }

  ngOnInit(): void {

  }
}
