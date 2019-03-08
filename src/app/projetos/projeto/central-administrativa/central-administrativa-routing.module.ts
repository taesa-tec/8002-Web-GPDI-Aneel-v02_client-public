import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoResolverService } from '@app/projetos/projeto-resolver.service';
import { ProjetoComponent } from '../projeto.component';
import { CentralAdministrativaComponent } from './central-administrativa.component';
import { LogsDutoComponent } from './logs-duto/logs-duto.component';
import { GeracaoXmlComponent } from './geracao-xml/geracao-xml.component';
import { AlterarStatusComponent } from './alterar-status/alterar-status.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RepositorioXmlComponent } from './repositorio-xml/repositorio-xml.component';
import { LogProjetoComponent } from '../log-projeto/log-projeto.component';

const routes: Routes = [
    {
        path: 'dashboard/projeto/:id/central-administrativa',
        component: ProjetoComponent,
        children: [
            {
                path: '', component: CentralAdministrativaComponent, children: [{
                    path: "",
                    redirectTo: "geracao-xml",
                    pathMatch: "full"
                },
                {
                    path: "geracao-xml", component: GeracaoXmlComponent,
                    data: { text: 'Geração XMLS' }
                },
                {
                    path: "logs-duto", component: LogsDutoComponent,
                    data: { text: 'Logs DUTO' }
                },
                {
                    path: "repositorio-xml", component: RepositorioXmlComponent,
                    data: { text: 'Repositório XMLs Gerados' }
                },
                {
                    path: "alteracao-status-projeto", component: AlterarStatusComponent,
                    data: { text: 'Alteração Status Projeto' }
                },
                {
                    path: "usuarios", component: UsuariosComponent,
                    data: { text: 'Usuários' }
                }],
            },

        ],
        resolve: {
            projeto: ProjetoResolverService
        },

    },
    {
        path: 'dashboard/projeto/:id/logs', component: ProjetoComponent,
        children: [{
            path: '', component: LogProjetoComponent
        }],
        resolve: {
            projeto: ProjetoResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class CentralAdministrativaRoutingModule { }