import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';
import { NotFoundComponent } from './not-found/not-found.component';
library.add(fas, far);

@NgModule({
    declarations: [DashboardComponent, MeuCadastroComponent, MeusProjetosComponent, NotFoundComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
