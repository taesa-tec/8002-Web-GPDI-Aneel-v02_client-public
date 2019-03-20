import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { StatusFlowComponent } from './status-flow.component';
import { ProjetoResolverService } from '../projeto-resolver.service';

const routes: Routes = [
    {
        path: 'dashboard/projeto/:id',
        component: StatusFlowComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
            projeto: ProjetoResolverService
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetoRoutingModule { }