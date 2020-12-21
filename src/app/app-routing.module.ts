import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@app/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', pathMatch: 'full', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'gestor',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-gestor/gestor.module').then(m => m.GestorModule)
  },
  {
    path: 'suprimento',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-suprimento/suprimento.module').then(m => m.SuprimentoModule)
  },
  {
    path: 'fornecedor',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-fornecedor/fornecedor.module').then(m => m.FornecedorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
