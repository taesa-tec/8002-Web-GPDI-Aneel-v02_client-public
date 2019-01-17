import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    user: User = {
        userID: "",
        password: ""
    };
    // @todo Inserir loading
    constructor(protected authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    doLogin() {
        const self = this;

        this.authService.login(this.user).subscribe({
            next(result) {
                console.log(result);
                self.router.navigate(['/dashboard']);
            },
            error(e) {
                console.log(e);

            }
        });

    }
}
