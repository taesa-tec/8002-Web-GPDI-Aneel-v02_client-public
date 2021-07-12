import {UserRole} from '@app/commons';
import {Route, Routes} from '@angular/router';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {NotFoundComponent} from '@app/core/screens/not-found.component';

export const NotFoundRoute: Route = {
  path: '**',
  component: NotFoundComponent
};
export const MeuCadastroRoute: Route = {
  path: 'meu-cadastro',
  canActivate: ['logged'],
  loadChildren: () => import('@app/pages/meu-cadastro/meu-cadastro.module').then(m => m.MeuCadastroModule)

};
export const RedirectRoute = (r, rd = null) => ({
  path: rd ? r : '',
  pathMatch: 'full',
  redirectTo: rd || r
});
export const ProjetosRoute: Route = {
  path: 'projetos',
  loadChildren: () => import('@app/pages/projetos/projetos.module')
    .then(m => m.ProjetosModule)
};

export const ConfiguracaoRoute: Route = {
  path: 'configuracoes',
  component: SidebarComponent,
  loadChildren: () => import('@app/pages/configuracoes/configuracoes-sistema.module').then(m => m.ConfiguracoesSistemaModule)
};

export const GerenciarUsuariosRoute: Route = {
  path: 'gerenciar-usuarios',
  loadChildren: () => import('@app/pages/gerenciar-usuarios/gerenciar-usuarios.module').then(m => m.GerenciarUsuariosModule)
};
export const DemandasRoute: Route = {
  path: 'demandas',
  loadChildren: () => import('@app/pages/demandas/demandas.module').then(m => m.DemandasModule)
};
export const CaptacoesRoute: Route = {
  path: 'captacoes',
  component: SidebarComponent,
  loadChildren: () => import('@app/pages/captacao/captacao.module').then(m => m.CaptacaoModule)
};

export const PropostaSelecaoRoute: Route = {
  path: 'selecao',
  component: SidebarComponent,
  loadChildren: () => import('@app/pages/propostas/selecao/propostas-selecao.module').then(m => m.PropostasSelecaoModule)
};
export const PropostaRefinamentoRoute: Route = {
  path: 'refinamento',
  loadChildren: () => import('@app/pages/propostas/refinamento/propostas-refinamento.module')
    .then(m => m.PropostasRefinamentoModule)
};
export const PropostaFormalizacaoRoute: Route = {
  path: 'formalizacao',
  component: SidebarComponent,
  loadChildren: () => import('@app/pages/propostas/formalizacao/propostas-formalizacao.module')
    .then(m => m.PropostasFormalizacaoModule)
};

export const PropostaRiscosRoute: Route = {
  path: 'identificacao-riscos',
  component: SidebarComponent,
  loadChildren: () => import('@app/pages/propostas/identificacao-riscos/propostas-identificacao-riscos.module')
    .then(m => m.PropostasIdentificacaoRiscosModule)
};

const GuestRoutes: Routes = [{path: '', loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule)}];
const AdminRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isAdmin'],
  canActivateChild: ['logged', 'isAdmin'],
  loadChildren: () => import('@app/users-modules/admin/admin.module').then(m => m.AdminModule)
}];
const GestorRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isGestor'],
  canActivateChild: ['logged', 'isGestor'],
  loadChildren: () => import('@app/users-modules/gestor/gestor.module').then(m => m.GestorModule)
}];
const SuprimentoRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isSuprimento'],
  canActivateChild: ['logged', 'isSuprimento'],
  loadChildren: () => import('@app/users-modules/suprimento/suprimento.module').then(m => m.SuprimentoModule)
}];
const FornecedorRoutes: Routes = [{
  path: '',
  canActivate: ['logged', 'isFornecedor'],
  canActivateChild: ['logged', 'isFornecedor'],
  loadChildren: () => import('@app/users-modules/fornecedor/fornecedor.module').then(m => m.FornecedorModule)
}];

export const RoutesRoleMap = new Map<string, Routes>([
  ['', GuestRoutes],
  [UserRole.Administrador, AdminRoutes],
  [UserRole.User, GestorRoutes],
  [UserRole.Fornecedor, FornecedorRoutes],
  [UserRole.Suprimento, SuprimentoRoutes]
]);
