import {UserRole} from '@app/commons';
import {Route, Routes} from '@angular/router';


export const MeuCadastroRoute: Route = {
  path: 'meu-cadastro',
  canActivate: ['logged'],
  loadChildren: () => import('@app/meu-cadastro/meu-cadastro.module').then(m => m.MeuCadastroModule)

};

const GuestRoutes: Routes = [{path: '', loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule)}];
const AdminRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isAdmin'],
  canActivateChild: ['logged', 'isAdmin'],
  loadChildren: () => import('@app/user-admin/admin.module').then(m => m.AdminModule)
}];
const GestorRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isGestor'],
  canActivateChild: ['logged', 'isGestor'],
  loadChildren: () => import('@app/user-gestor/gestor.module').then(m => m.GestorModule)
}];
const SuprimentoRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isSuprimento'],
  canActivateChild: ['logged', 'isSuprimento'],
  loadChildren: () => import('@app/user-suprimento/suprimento.module').then(m => m.SuprimentoModule)
}];
const FornecedorRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isFornecedor'],
  canActivateChild: ['logged', 'isFornecedor'],
  loadChildren: () => import('@app/user-fornecedor/fornecedor.module').then(m => m.FornecedorModule)
}];

export const RoutesRoleMap = new Map<string, Routes>([
  ['', GuestRoutes],
  [UserRole.Administrador, AdminRoutes],
  [UserRole.User, GestorRoutes],
  [UserRole.Fornecedor, FornecedorRoutes],
  [UserRole.Suprimento, SuprimentoRoutes]
]);
