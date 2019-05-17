import {Routes, RouterModule, Route} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '@app/auth/auth.guard';
import {ProjetoResolverService} from '../projeto-resolver.service';
import {routes as propostaRoutes} from './proposta/proposta-routing.module';
import {routes as iniciadoRoutes} from './iniciado/iniciado-routing.module';
import {routes as finalizadoRoutes} from './encerrado/encerrado-routing.module';
import {routes as centralRoutes} from './central-administrativa/central-administrativa-routing.module';
import {ProjetoComponent} from '@app/projetos/projeto/projeto.component';

const routes: Routes = [
    {
        path: 'dashboard/projeto/:id',
        component: ProjetoComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
            projeto: ProjetoResolverService
        },
        children: [...propostaRoutes, ...iniciadoRoutes, ...finalizadoRoutes, ...centralRoutes]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetoRoutingModule {
}
