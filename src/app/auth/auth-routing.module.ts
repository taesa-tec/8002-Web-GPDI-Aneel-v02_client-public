import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewpassComponent } from './newpass/newpass.component';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'forget', component: ForgetPassComponent },
            { path: 'newpass', component: NewpassComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
