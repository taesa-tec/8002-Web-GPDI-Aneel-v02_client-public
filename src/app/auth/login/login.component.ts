import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/shared/user.model';
import { NgxSpinnerService } from "ngx-spinner";
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

    constructor(protected authService: AuthService, protected spinner: NgxSpinnerService, private router: Router) { }

    ngOnInit() {
    }

    doLogin() {
        const self = this;
        this.spinner.show();

        this.authService.login(this.user).subscribe({
            next(result) {
                console.log(result);
                self.router.navigate(['/dashboard']);
                self.spinner.hide();
            },
            error(e) {
                console.log(e);
                self.spinner.hide();
            }
        });

    }
}
