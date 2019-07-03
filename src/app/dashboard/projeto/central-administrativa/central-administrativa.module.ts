import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared/shared.module';
import { CentralAdministrativaRoutingModule } from './central-administrativa-routing.module';
import { CentralAdministrativaComponent } from '@app/dashboard/projeto/central-administrativa/central-administrativa.component';
import { GeracaoXmlComponent } from '@app/dashboard/projeto/central-administrativa/geracao-xml/geracao-xml.component';
import { LogsDutoComponent } from '@app/dashboard/projeto/central-administrativa/logs-duto/logs-duto.component';
import { RepositorioXmlComponent } from '@app/dashboard/projeto/central-administrativa/repositorio-xml/repositorio-xml.component';
import { AlterarStatusComponent } from '@app/dashboard/projeto/central-administrativa/alterar-status/alterar-status.component';
import { UsuariosComponent } from '@app/dashboard/projeto/central-administrativa/usuarios/usuarios.component';
import { CommonModule } from '../common/common.module';

@NgModule({
    declarations: [
        CentralAdministrativaComponent,
        GeracaoXmlComponent,
        LogsDutoComponent,
        RepositorioXmlComponent,
        AlterarStatusComponent,
        UsuariosComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        CentralAdministrativaRoutingModule
    ]
})
export class CentralAdministrativaModule { }
