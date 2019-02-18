import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MeusProjetosComponent } from '@app/dashboard/meus-projetos/meus-projetos.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';

import { projetoPlanejamentoRoutes, projetoRoutes } from '@app/projetos/projeto-routings';
import { ProjetoComponent } from '@app/projetos/projeto/projeto.component';

import { AuthGuard } from '@app/auth/auth.guard';
import { NewUserComponent } from '@app/users/new-user/new-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';
import { ProjetoResolverService } from '@app/projetos/projeto-resolver.service';



const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', component: MeusProjetosComponent, data: { title: "Meus Projetos" } },
            { path: 'meu-cadastro', component: MeuCadastroComponent, data: { title: "Meu Cadastro" } },
            { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, data: { title: "Meu Cadastro" }, },
            { path: 'gerenciar-usuarios/novo', component: NewUserComponent, data: { title: "Novo Usuário" }, },
            { path: 'gerenciar-usuarios/edit/:id', component: EditUserComponent, data: { title: "Novo Usuário" }, },
            { path: 'projeto', redirectTo: '', pathMatch: 'full' },
            {
                path: 'projeto/:id', component: ProjetoComponent, children: projetoRoutes,
                resolve: {
                    projeto: ProjetoResolverService
                }
            },
            { path: '**', component: NotFoundComponent, data: { title: "Não encontrado" } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
