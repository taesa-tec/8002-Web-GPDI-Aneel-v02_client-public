import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MeusProjetosComponent} from '@app/dashboard/shared/meus-projetos/meus-projetos.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {AuthGuard} from '@app/auth/auth.guard';
import {NewUserComponent} from '@app/users/new-user/new-user.component';
import {EditUserComponent} from '@app/users/edit-user/edit-user.component';
import {AdminGuard} from '@app/dashboard/guards/admin.guard';
import {MainComponent} from './shared/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', redirectTo: 'demandas', pathMatch: 'full'},
      {path: 'meus-projetos', component: MeusProjetosComponent},
      {path: 'meu-cadastro', component: MeuCadastroComponent},
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
        loadChildren: () => import('@app/dashboard/demandas/demandas.module').then(m => m.DemandasModule)
      },
      {
        path: 'captacao',
        component: MainComponent,
        loadChildren: () => import('@app/dashboard/captacao/captacao.module').then(m => m.CaptacaoModule)
      },
      {
        path: 'configuracoes',
        component: MainComponent,
        loadChildren: () => import('@app/dashboard/configuracoes-sistema/configuracoes-sistema.module').then(m => m.ConfiguracoesSistemaModule)
      },
      {
        path: 'demanda',
        loadChildren: () => import('@app/dashboard/demanda/demanda.module').then(m => m.DemandaModule)
      },
      // PROVISÓRIO
      {
        path: 'suprimentos',
        loadChildren: () => import('@app/dashboard/suprimentos/suprimentos.module').then(m => m.SuprimentosModule)
      },
      {
        path: 'fornecedor',
        loadChildren: () => import('@app/dashboard/fornecedor/fornecedor.module').then(m => m.FornecedorModule)
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
