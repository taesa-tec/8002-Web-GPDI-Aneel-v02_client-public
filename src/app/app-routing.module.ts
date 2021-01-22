import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@app/auth/auth.guard';
import {IndexComponent} from '@app/index.component';
import {AdminRootUrl, FornecedorRootUrl, GestorRootUrl, SuprimentoRootUrl} from '@app/routes/routes';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', pathMatch: 'full', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: AdminRootUrl,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: GestorRootUrl,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-gestor/gestor.module').then(m => m.GestorModule)
  },
  {
    path: SuprimentoRootUrl,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-suprimento/suprimento.module').then(m => m.SuprimentoModule)
  },
  {
    path: FornecedorRootUrl,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/user-fornecedor/fornecedor.module').then(m => m.FornecedorModule)
  },
  {
    path: '**',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
