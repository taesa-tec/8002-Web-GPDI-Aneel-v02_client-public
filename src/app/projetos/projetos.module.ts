import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { SharedModule } from '../shared/shared.module';
import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { EtapaFormComponent } from './etapa-form/etapa-form.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { RecursoHumanoFormComponent } from './recurso-humano-form/recurso-humano-form.component';
import { AlocarRecursoHumanoFormComponent } from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { RecursoMaterialFormComponent } from './recurso-material-form/recurso-material-form.component';
import { AlocarRecursoMaterialFormComponent } from './alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from './projetos.service';

@NgModule({
    declarations: [
        NovoProjetoComponent,
        ProjetoCardComponent,
        ProdutoFormComponent,
        EtapaFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent,
    ],
    entryComponents: [
        NovoProjetoComponent,
        ProdutoFormComponent,
        EtapaFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
    providers: [ProjetosService],
    exports: [
        NovoProjetoComponent, ProjetoCardComponent
    ]
})
export class ProjetosModule { }
