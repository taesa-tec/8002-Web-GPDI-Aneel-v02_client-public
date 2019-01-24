import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '@app/commons/requests';
import { LoadingComponent } from '@app/shared/loading/loading.component';

// @todo Inserir loading
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    loginRequest: LoginRequest = {
        email: "admin@taesa.com.br",
        password: "AdminAPIGestor01!"
    };

    remember = false;

    constructor(protected authService: AuthService, private router: Router) { }

    doLogin() {

        const self = this;
        this.loading.show();
        this.authService.login(this.loginRequest, this.remember).subscribe({
            next(result) {
                self.loading.hide();
                if (result) {
                    self.router.navigate(['/dashboard']);
                }
            },
            error(e) {
                self.loading.hide();
            }
        });

    }

    ngOnInit(): void {

    }
}
