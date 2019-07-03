import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@app/auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: '@app/dashboard/dashboard.module#DashboardModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
