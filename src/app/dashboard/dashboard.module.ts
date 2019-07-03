import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {SharedModule} from '@app/core/shared/shared.module';
import {MeuCadastroComponent} from './meu-cadastro/meu-cadastro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GerenciarUsuariosComponent} from './gerenciar-usuarios/gerenciar-usuarios.component';
import {DashboardComponent} from './dashboard.component';
import {MeusProjetosComponent} from './meus-projetos/meus-projetos.component';

import {UsersModule} from '@app/users/users.module';
import {ProjetoCardComponent} from '@app/dashboard/projeto-card/projeto-card.component';
import {ListaProjetosComponent} from '@app/dashboard/lista-projetos/lista-projetos.component';
import {NovoProjetoComponent} from '@app/core/shared/novo-projeto/novo-projeto.component';


@NgModule({
    declarations: [
        DashboardComponent,
        MeuCadastroComponent,
        NotFoundComponent,
        GerenciarUsuariosComponent,
        MeusProjetosComponent,
        ProjetoCardComponent,
        ListaProjetosComponent,
        NovoProjetoComponent
    ],
    entryComponents: [NovoProjetoComponent],
    imports: [
        SharedModule,
        UsersModule,
        DashboardRoutingModule,
    ]
})
export class DashboardModule {
}
