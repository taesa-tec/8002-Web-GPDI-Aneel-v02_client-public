import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MeusProjetosComponent} from '@app/dashboard/shared/components/meus-projetos/meus-projetos.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {AuthGuard} from '@app/auth/auth.guard';
import {NewUserComponent} from '@app/dashboard/users/new-user/new-user.component';
import {EditUserComponent} from '@app/dashboard/users/edit-user/edit-user.component';
import {AdminGuard} from '@app/dashboard/shared/guards/admin.guard';
import {MainComponent} from './shared/components/main/main.component';
import {IndexComponent} from '@app/dashboard/index/index.component';
import {HasRoleGuard} from '@app/dashboard/shared/guards';
import {UserRole} from '@app/commons';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', component: IndexComponent, pathMatch: 'full'},
      {path: 'meus-projetos', component: MeusProjetosComponent},
      // @todo Criar modulo
      {path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, canActivate: [AdminGuard]},
      {path: 'gerenciar-usuarios/novo', component: NewUserComponent, canActivate: [AdminGuard]},
      {path: 'gerenciar-usuarios/edit/:id', component: EditUserComponent, canActivate: [AdminGuard]},
      {
        path: 'projetos',
        component: MainComponent,
        loadChildren: () => import('@app/dashboard/projetos/projetos.module').then(m => m.ProjetosModule)
      },
      // {
      //   path: 'projeto',
      //   loadChildren: () => import('@app/dashboard/projeto/projeto.module').then(m => m.ProjetoModule)
      // },
      {
        path: 'demandas',
        component: MainComponent,
        loadChildren: () => import('@app/user-shared/demandas/demandas.module').then(m => m.DemandasModule)
      },
      {
        path: 'captacoes',
        component: MainComponent,
        loadChildren: () => import('@app/user-shared/captacao/captacao.module').then(m => m.CaptacaoModule)
      },
      {
        path: 'configuracoes',
        canActivate: [HasRoleGuard],
        component: MainComponent,
        data: {
          roles: [UserRole.Administrador]
        },
        loadChildren: () => import('@app/user-admin/configuracoes/configuracoes-sistema.module').then(m => m.ConfiguracoesSistemaModule)
      },
      // {
      //   path: 'demanda',
      //   loadChildren: () => import('@app/user-shared/demanda/demanda.module').then(m => m.DemandaModule)
      // },
      // PROVISÓRIO
      {
        path: 'suprimentos',
        loadChildren: () => import('@app/user-suprimento/suprimentos/suprimentos.module').then(m => m.SuprimentosModule)
      },
      {
        path: 'fornecedor',
        loadChildren: () => import('@app/user-fornecedor/fornecedor.module').then(m => m.FornecedorModule)
      },
      //-----------------------------------------------------------------------------------------------------------
      {path: '**', component: NotFoundComponent},
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
