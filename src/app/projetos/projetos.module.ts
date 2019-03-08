import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProjetoModule } from './projeto/projeto.module';
import { SharedModule } from '../shared/shared.module';

import { ProjetosService } from './projetos.service';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { ListComponent } from './list/list.component';

// Projeto Page
import { ProjetoComponent } from '@app/projetos/projeto/projeto.component';

// Projeto Central Administrativa
import { CentralAdministrativaComponent } from '@app/projetos/projeto/central-administrativa/central-administrativa.component';
import { GeracaoXmlComponent } from '@app/projetos/projeto/central-administrativa/geracao-xml/geracao-xml.component';
import { LogsDutoComponent } from '@app/projetos/projeto/central-administrativa/logs-duto/logs-duto.component';
import { RepositorioXmlComponent } from '@app/projetos/projeto/central-administrativa/repositorio-xml/repositorio-xml.component';
import { AlterarStatusComponent } from '@app/projetos/projeto/central-administrativa/alterar-status/alterar-status.component';
import { UsuariosComponent } from '@app/projetos/projeto/central-administrativa/usuarios/usuarios.component';
import { LogProjetoComponent } from '@app/projetos/projeto/log-projeto/log-projeto.component';
import { LogComponent } from '@app/projetos/projeto/log-projeto/log.component';

@NgModule({
    declarations: [
        NovoProjetoComponent,
        ProjetoCardComponent,
        ListComponent,
        
        // Projeto Single
        ProjetoComponent,
        CentralAdministrativaComponent,
        GeracaoXmlComponent,
        LogsDutoComponent,
        RepositorioXmlComponent,
        AlterarStatusComponent,
        UsuariosComponent,
        LogProjetoComponent,
        LogComponent,
        
    ],
    entryComponents: [
        NovoProjetoComponent,
    ],
    imports: [
        ProjetoModule,
        SharedModule,
        RouterModule,
    ],
    providers: [ProjetosService],
    exports: [
        ProjetoModule,
        NovoProjetoComponent,
        ProjetoCardComponent,
        ListComponent,
        ProjetoComponent,
        CentralAdministrativaComponent,
        GeracaoXmlComponent,
        LogsDutoComponent,
        RepositorioXmlComponent,
        AlterarStatusComponent,
        UsuariosComponent,
        LogProjetoComponent,
        LogComponent
    ]
})
export class ProjetosModule { }
