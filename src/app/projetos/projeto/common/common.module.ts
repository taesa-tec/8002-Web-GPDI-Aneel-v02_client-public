import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AlocarRecursoHumanoFormComponent } from '@app/projetos/projeto/common/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/projeto/common/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { EmpresaFormComponent } from '@app/projetos/projeto/common/empresa-form/empresa-form.component';
import { EtapaFormComponent } from '@app/projetos/projeto/common/etapa-form/etapa-form.component';
import { ProdutoFormComponent } from '@app/projetos/projeto/common/produto-form/produto-form.component';
import { RecursoHumanoFormComponent } from '@app/projetos/projeto/common/recurso-humano-form/recurso-humano-form.component';
import { RecursoMaterialFormComponent } from '@app/projetos/projeto/common/recurso-material-form/recurso-material-form.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/common/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/common/recursos-materiais/recursos-materiais.component';

@NgModule({
    declarations: [
        ProdutoFormComponent,
        EtapaFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent,
        RecursosHumanosComponent,
        RecursosMateriaisComponent,
    ],
    entryComponents: [
        ProdutoFormComponent,
        EtapaFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        RecursosHumanosComponent,
        RecursosMateriaisComponent,
    ]

})
export class CommonModule { }
