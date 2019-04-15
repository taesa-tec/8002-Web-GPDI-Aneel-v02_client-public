import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth/auth.component';
import {ForgetPassComponent} from './forget-pass/forget-pass.component';
import {LoginComponent} from './login/login.component';
import {NewpassComponent} from './newpass/newpass.component';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './auth.service';


@NgModule({
    declarations: [AuthComponent, ForgetPassComponent, LoginComponent, NewpassComponent],
    imports: [
        SharedModule,
        AuthRoutingModule
    ],
    providers: [AuthService]
})
export class AuthModule {
}
