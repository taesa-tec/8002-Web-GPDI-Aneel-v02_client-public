import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';
import {RecursosHumanosComponent} from '@app/dashboard/projeto/common/recursos-humanos/recursos-humanos.component';
import {RecursosMateriaisComponent} from '@app/dashboard/projeto/common/recursos-materiais/recursos-materiais.component';
import {ProdutosComponent} from '@app/dashboard/projeto/common/produtos/produtos.component';
import {AlocacaoComponent as AlocacaoHumanoComponent} from '@app/dashboard/projeto/common/recursos-humanos/alocacao.component';
import {AlocacaoComponent as AlocacaoMaterialComponent} from '@app/dashboard/projeto/common/recursos-materiais/alocacao.component';
import {OrcamentoEmpresasComponent} from '@app/dashboard/projeto/common/orcamento-empresas/orcamento-empresas.component';
import {OrcamentoEtapasComponent} from '@app/dashboard/projeto/common/orcamento-etapas/orcamento-etapas.component';

import {EditorsModule} from './editors/editors.module';
import {LoggerModule} from '@app/logger/logger.module';
import {ProdutoFormComponent} from '@app/dashboard/projeto/common/produtos/produto-form/produto-form.component';
import {EtapaFormComponent} from '@app/dashboard/projeto/common/etapa-form/etapa-form.component';
import {EtapaAtividadesFormComponent} from '@app/dashboard/projeto/common/etapa-atividades-form/etapa-atividades-form.component';
import {EmpresaFormComponent} from '@app/dashboard/projeto/common/empresa-form/empresa-form.component';
import {RecursoHumanoFormComponent} from '@app/dashboard/projeto/common/recursos-humanos/recurso-humano-form/recurso-humano-form.component';
import {AlocarRecursoHumanoFormComponent} from '@app/dashboard/projeto/common/recursos-humanos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {RecursoMaterialFormComponent} from '@app/dashboard/projeto/common/recursos-materiais/recurso-material-form/recurso-material-form.component';
import {AlocarRecursoMaterialFormComponent} from '@app/dashboard/projeto/common/recursos-materiais/alocar-recurso-material-form/alocar-recurso-material-form.component';


@NgModule({
    declarations: [
        RecursosHumanosComponent,
        RecursosMateriaisComponent,
        ProdutosComponent,
        AlocacaoHumanoComponent,
        AlocacaoMaterialComponent,
        OrcamentoEmpresasComponent,
        OrcamentoEtapasComponent,
        ProdutoFormComponent,
        EtapaFormComponent,
        EtapaAtividadesFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent

    ],
    imports: [
        SharedModule,
        LoggerModule,
        EditorsModule
    ],
    exports: [
        EditorsModule,
        LoggerModule,
        RecursosHumanosComponent,
        RecursosMateriaisComponent,
        ProdutosComponent,
        AlocacaoHumanoComponent,
        AlocacaoMaterialComponent,
        OrcamentoEmpresasComponent,
        OrcamentoEtapasComponent,
    ],
    entryComponents: [
        ProdutoFormComponent,
        EtapaFormComponent,
        EtapaAtividadesFormComponent,
        EmpresaFormComponent,
        RecursoHumanoFormComponent,
        AlocarRecursoHumanoFormComponent,
        RecursoMaterialFormComponent,
        AlocarRecursoMaterialFormComponent
    ]

})
export class CommonModule {
}
