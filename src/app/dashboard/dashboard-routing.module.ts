import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MeusProjetosComponent} from '@app/dashboard/meus-projetos/meus-projetos.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {AuthGuard} from '@app/auth/auth.guard';
import {NewUserComponent} from '@app/users/new-user/new-user.component';
import {EditUserComponent} from '@app/users/edit-user/edit-user.component';
import {AdminGuard} from '@app/core/guards/admin.guard';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: MeusProjetosComponent},
            {path: 'meu-cadastro', component: MeuCadastroComponent},
            {path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, canActivate: [AdminGuard]},
            {path: 'gerenciar-usuarios/novo', component: NewUserComponent, canActivate: [AdminGuard]},
            {path: 'gerenciar-usuarios/edit/:id', component: EditUserComponent, canActivate: [AdminGuard]},

            {
                path: 'projeto',
                loadChildren: '@app/dashboard/projeto/projeto.module#ProjetoModule'
            },

            {path: '**', component: NotFoundComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
