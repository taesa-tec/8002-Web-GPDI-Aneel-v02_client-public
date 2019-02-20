import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MeusProjetosComponent } from '@app/dashboard/meus-projetos/meus-projetos.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';

import { projetoPlanejamentoRoutes, projetoRoutes, projetoIniciadoRoutes, centralPlanejamentoRoutes } from '@app/projetos/projeto-routings';
import { ProjetoComponent } from '@app/projetos/projeto/projeto.component';

import { AuthGuard } from '@app/auth/auth.guard';
import { NewUserComponent } from '@app/users/new-user/new-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';
import { ProjetoResolverService } from '@app/projetos/projeto-resolver.service';
import { CentralAdministrativaComponent } from '@app/projetos/projeto/central-administrativa/central-administrativa.component';
import { LogProjetoComponent } from '@app/projetos/projeto/log-projeto/log-projeto.component';



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
            {
                path: 'projeto/:id/proposta', component: ProjetoComponent, children: projetoPlanejamentoRoutes,
                resolve: {
                    projeto: ProjetoResolverService
                },

            },
            {
                path: 'projeto/:id/iniciado', component: ProjetoComponent, children: projetoIniciadoRoutes,
                resolve: {
                    projeto: ProjetoResolverService
                },

            },
            {
                path: 'projeto/:id/finalizado', component: ProjetoComponent, children: projetoRoutes,
                resolve: {
                    projeto: ProjetoResolverService
                },

            },
            {
                path: 'projeto/:id/central-administrativa',
                component: ProjetoComponent,
                children: [
                    {
                        path: '', component: CentralAdministrativaComponent, children: centralPlanejamentoRoutes,
                        data: { text: "Central Adminstrativa", icon: "ta-central-admin", routes: centralPlanejamentoRoutes }
                    }
                ],
                resolve: {
                    projeto: ProjetoResolverService
                }
            },
            {
                path: 'projeto/:id/logs', component: ProjetoComponent,
                children: [{
                    path: '', component: LogProjetoComponent
                }],
                resolve: {
                    projeto: ProjetoResolverService
                }
            }
            // { path: '**', component: NotFoundComponent, data: { title: "Não encontrado" } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
    constructor() {
        console.log({ rotas: projetoRoutes });

    }
}
