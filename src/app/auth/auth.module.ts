import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { LoginComponent } from './login/login.component';
import { NewpassComponent } from './newpass/newpass.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [AuthComponent, ForgetPassComponent, LoginComponent, NewpassComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        SharedModule
    ],
    providers: [AuthService]
})
export class AuthModule { }
