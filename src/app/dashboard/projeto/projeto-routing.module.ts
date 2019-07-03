import {Routes, RouterModule, Route} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '@app/auth/auth.guard';
import {ProjetoResolver} from './projeto.resolver';
import {routes as propostaRoutes} from './proposta/proposta-routing.module';
import {routes as iniciadoRoutes} from './iniciado/iniciado-routing.module';
import {routes as finalizadoRoutes} from './encerrado/encerrado-routing.module';
import {routes as centralRoutes} from './central-administrativa/central-administrativa-routing.module';
import {ProjetoComponent} from '@app/dashboard/projeto/projeto.component';
import {ProjetoStatusGuard} from '@app/dashboard/projeto/guards/projeto-status.guard';
import {LogProjetoComponent} from '@app/dashboard/projeto/log-projeto/log-projeto.component';

const routes: Routes = [
    {
        path: ':id',
        component: ProjetoComponent,
        resolve: {
            projeto: ProjetoResolver
        },
        children: [
            {
                path: '',
                canActivate: [ProjetoStatusGuard],
            },
            {
                path: 'proposta',
                canActivate: [ProjetoStatusGuard],
                loadChildren: './proposta/proposta.module#PropostaModule'
            },
            {
                path: 'iniciado',
                canActivate: [ProjetoStatusGuard],
                loadChildren: './iniciado/iniciado.module#IniciadoModule'
            },
            {
                path: 'encerrado',
                canActivate: [ProjetoStatusGuard],
                loadChildren: './encerrado/encerrado.module#EncerradoModule'
            },
            {
                path: 'central-administrativa',
                loadChildren: './central-administrativa/central-administrativa.module#CentralAdministrativaModule'
            },
            {
                path: 'logs',
                component: LogProjetoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetoRoutingModule {
}
