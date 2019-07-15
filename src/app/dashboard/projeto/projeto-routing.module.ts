import {Routes, RouterModule, Route} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjetoComponent} from '@app/dashboard/projeto/projeto.component';
import {ProjetoStatusGuard} from '@app/dashboard/projeto/guards/projeto-status.guard';
import {LogProjetoComponent} from '@app/dashboard/projeto/log-projeto/log-projeto.component';
import {ProjetoResolver} from '@app/dashboard/projeto/projeto.resolver';
import {ProjetoAccessGuard} from '@app/dashboard/projeto/guards/projeto-access.guard';

const routes: Routes = [
    {
        path: ':id',
        component: ProjetoComponent,
        resolve: {
            projeto: ProjetoResolver
        },
        canActivate: [ProjetoResolver],
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
                data: {
                    access: ['admin', 'aprovador']
                },
                canActivate: [ProjetoAccessGuard],
                loadChildren: './central-administrativa/central-administrativa.module#CentralAdministrativaModule'
            },
            {
                path: 'logs',
                data: {
                    access: ['admin', 'aprovador']
                },
                canActivate: [ProjetoAccessGuard],
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
