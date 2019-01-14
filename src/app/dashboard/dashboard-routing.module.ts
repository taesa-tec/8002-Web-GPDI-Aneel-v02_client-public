import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MeusProjetosComponent } from '../projetos/meus-projetos/meus-projetos.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { ProjetoComponent } from '@app/projetos/projeto/projeto.component';
import { InfoComponent } from '@app/projetos/projeto/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/temas/temas.component';
import { ProdutosComponent } from '@app/projetos/projeto/produtos/produtos.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: MeusProjetosComponent, data: { title: "Meus Projetos" } },
            { path: 'meu-cadastro', component: MeuCadastroComponent, data: { title: "Meu Cadastro" } },
            { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, data: { title: "Meu Cadastro" } },
            { path: 'projeto', redirectTo: '', pathMatch: 'full' },
            {
                path: 'projeto/:id', component: ProjetoComponent, children: [
                    { path: '', component: InfoComponent },
                    { path: 'temas', component: TemasComponent },
                    { path: 'produtos', component: ProdutosComponent },
                    { path: 'etapas', component: ProdutosComponent },
                    { path: 'empresas', component: ProdutosComponent },
                    { path: 'recursos-humanos', component: ProdutosComponent },
                    { path: 'alocacao-recursos-humanos', component: ProdutosComponent },
                    { path: 'recursos-materiais', component: ProdutosComponent },
                    { path: 'alocacao-recursos-materiais', component: ProdutosComponent },
                    { path: 'extrato-financeiro-empresas', component: ProdutosComponent },
                    { path: 'extrato-financeiro-etapas', component: ProdutosComponent },
                    { path: 'central-administrativa', component: ProdutosComponent },
                    { path: 'logs', component: ProdutosComponent },
                    { path: '**', redirectTo: '', pathMatch: 'full' }
                ]
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
