import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MeusProjetosComponent } from '@app/dashboard/meus-projetos/meus-projetos.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { ProjetoComponent } from './projetos/projeto.component';

import { projetoPlanejamentoRoutes } from '@app/dashboard/projetos/projeto.routes';
import { NovoUsuarioComponent } from './gerenciar-usuarios/novo-usuario/novo-usuario.component';
import { EditUsuarioComponent } from './gerenciar-usuarios/edit-usuario/edit-usuario.component';



const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: MeusProjetosComponent, data: { title: "Meus Projetos" } },
            { path: 'meu-cadastro', component: MeuCadastroComponent, data: { title: "Meu Cadastro" } },
            { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, data: { title: "Meu Cadastro" }, },
            { path: 'gerenciar-usuarios/novo', component: NovoUsuarioComponent, data: { title: "Novo Usuário" }, },
            { path: 'gerenciar-usuarios/edit/:id', component: EditUsuarioComponent, data: { title: "Novo Usuário" }, },
            { path: 'projeto', redirectTo: '', pathMatch: 'full' },
            { path: 'projeto/:id', component: ProjetoComponent, children: projetoPlanejamentoRoutes },
            { path: '**', component: NotFoundComponent, data: { title: "Não encontrado" } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
