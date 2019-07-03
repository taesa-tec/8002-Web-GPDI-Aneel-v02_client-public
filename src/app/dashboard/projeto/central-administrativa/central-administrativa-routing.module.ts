import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjetoResolver} from '@app/dashboard/projeto/projeto.resolver';
import {ProjetoComponent} from '../projeto.component';
import {CentralAdministrativaComponent} from './central-administrativa.component';
import {LogsDutoComponent} from './logs-duto/logs-duto.component';
import {GeracaoXmlComponent} from './geracao-xml/geracao-xml.component';
import {AlterarStatusComponent} from './alterar-status/alterar-status.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {RepositorioXmlComponent} from './repositorio-xml/repositorio-xml.component';
import {LogProjetoComponent} from '../log-projeto/log-projeto.component';

export const routes: Routes = [
    {
        path: '', component: CentralAdministrativaComponent,
        children: [
            {
                path: '',
                redirectTo: 'geracao-xml',
                pathMatch: 'full'
            },
            {
                path: 'geracao-xml', component: GeracaoXmlComponent,
                data: {text: 'Geração XMLS'}
            },
            {
                path: 'logs-duto', component: LogsDutoComponent,
                data: {text: 'Logs DUTO'}
            },
            {
                path: 'repositorio-xml', component: RepositorioXmlComponent,
                data: {text: 'Repositório XMLs Gerados'}
            },
            {
                path: 'alteracao-status-projeto', component: AlterarStatusComponent,
                data: {text: 'Alteração Status Projeto'}
            },
            {
                path: 'usuarios', component: UsuariosComponent,
                data: {text: 'Usuários'}
            }],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CentralAdministrativaRoutingModule {
}
