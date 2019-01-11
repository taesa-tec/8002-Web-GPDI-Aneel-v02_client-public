import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjetosModule } from '../projetos/projetos.module';
import { SharedModule } from '../shared/shared.module';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';

@NgModule({
    declarations: [DashboardComponent, MeuCadastroComponent, NotFoundComponent, GerenciarUsuariosComponent],
    imports: [
        CommonModule,
        SharedModule,
        ProjetosModule,
        NgbModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
