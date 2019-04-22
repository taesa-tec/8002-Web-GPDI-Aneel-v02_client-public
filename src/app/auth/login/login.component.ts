import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LoginRequest} from '@app/models';
import {LoadingComponent} from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    errorMessage: string;

    loginRequest: LoginRequest = {
        email: '',
        password: ''
    };

    remember = false;

    constructor(protected authService: AuthService, private router: Router) {
    }

    doLogin() {

        const self = this;

        this.loading.show();

        this.errorMessage = null;

        this.authService.login(this.loginRequest, this.remember).subscribe(
            result => {
                self.loading.hide();
                if (!result.authenticated) {
                    self.errorMessage = result.message;
                } else {
                    // self.router.navigate(['/dashboard']);
                }
            }, e => {
                console.log(e);
                self.loading.hide();
            });

    }

    ngOnInit(): void {

    }
}
