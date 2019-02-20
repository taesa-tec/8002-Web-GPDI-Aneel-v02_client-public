import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewpassComponent } from './newpass/newpass.component';
import { GuestGuard } from './guest.guard';
import { NewpassGuard } from './newpass.guard';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        children: [
            { path: '', component: LoginComponent },
            { path: 'forget', component: ForgetPassComponent },
            { path: 'newpass', component: NewpassComponent, canActivate: [NewpassGuard] },
            { path: 'nova-senha', component: NewpassComponent, canActivate: [NewpassGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
