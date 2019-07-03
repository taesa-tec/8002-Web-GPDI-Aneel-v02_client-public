import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth/auth.component';
import {ForgetPassComponent} from './forget-pass/forget-pass.component';
import {LoginComponent} from './login/login.component';
import {NewpassComponent} from './newpass/newpass.component';
import {SharedModule} from '@app/core/shared/shared.module';
import {AuthService} from '@app/core/services/auth.service';


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
