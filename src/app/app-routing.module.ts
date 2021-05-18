import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@app/auth/auth.guard';
import {IndexComponent} from '@app/index.component';
import {AdminRootUrl, FornecedorRootUrl, GestorRootUrl, SuprimentoRootUrl} from '@app/routes/routes';
import {AdminRoleGuard, FornecedorRoleGuard, SuprimentoRoleGuard, UserRoleGuard} from '@app/auth/role.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: AdminRootUrl,
    canActivate: [AuthGuard, AdminRoleGuard],
    canActivateChild: [AuthGuard, AdminRoleGuard],
    //canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: GestorRootUrl,
    canActivate: [AuthGuard, UserRoleGuard],
    canActivateChild: [AuthGuard, UserRoleGuard],
    //canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-gestor/gestor.module').then(m => m.GestorModule)
  },
  {
    path: SuprimentoRootUrl,
    canActivate: [AuthGuard, SuprimentoRoleGuard],
    canActivateChild: [AuthGuard, SuprimentoRoleGuard],
    //canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-suprimento/suprimento.module').then(m => m.SuprimentoModule)
  },
  {
    path: FornecedorRootUrl,
    canActivate: [AuthGuard, FornecedorRoleGuard],
    canActivateChild: [AuthGuard, FornecedorRoleGuard],
    //canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-fornecedor/fornecedor.module').then(m => m.FornecedorModule)
  },
  {
    path: '**',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
