import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { SharedModule } from '../shared/shared.module';
import { ProjetosService } from './projetos.service';

import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { EtapaFormComponent } from './etapa-form/etapa-form.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { RecursoHumanoFormComponent } from './recurso-humano-form/recurso-humano-form.component';
import { AlocarRecursoHumanoFormComponent } from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { RecursoMaterialFormComponent } from './recurso-material-form/recurso-material-form.component';
import { AlocarRecursoMaterialFormComponent } from './alocar-recurso-material-form/alocar-recurso-material-form.component';
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

// Projeto Proposta
import { InfoComponent } from '@app/projetos/projeto/proposta/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/proposta/temas/temas.component';
import { SubTemasComponent } from './projeto/proposta/temas/sub-tema.component';
import { ProdutosComponent } from '@app/projetos/projeto/proposta/produtos/produtos.component';
import { EtapasComponent } from '@app/projetos/projeto/proposta/etapas/etapas.component';
import { EmpresasComponent } from '@app/projetos/projeto/proposta/empresas/empresas.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/proposta/recursos-humanos/recursos-humanos.component';
import { AlocacaoComponent as AlocacaoHumanoComponent } from '@app/projetos/projeto/proposta/recursos-humanos/alocacao.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/proposta/recursos-materiais/recursos-materiais.component';
import { AlocacaoComponent as AlocacaoMaterialComponent } from '@app/projetos/projeto/proposta/recursos-materiais/alocacao.component';
import { ExtratoFinanceiroEmpresasComponent } from '@app/projetos/projeto/proposta/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from '@app/projetos/projeto/proposta/extrato-financeiro-etapas/extrato-financeiro-etapas.component';

// Projeto Iniciado
import { RefpInserirComponent } from './projeto/iniciado/refp-inserir/refp-inserir.component';
import { RefpListComponent } from './projeto/iniciado/refp-list/refp-list.component';
import { RefpExtratoComponent } from './projeto/iniciado/refp-extrato/refp-extrato.component';
import { AlterarProjetoComponent } from './projeto/iniciado/alterar-projeto/alterar-projeto.component';
import { ConsultarDadosComponent } from './projeto/iniciado/consultar-dados/consultar-dados.component';
import { RecursoHumanoComponent } from './projeto/iniciado/refp-inserir/recurso-humano.component';
import { RecursoMaterialComponent } from './projeto/iniciado/refp-inserir/recurso-material.component';
import { RegistroRefpDetailsComponent } from './projeto/iniciado/registro-refp-details/registro-refp-details.component';
import { RegistroRecursoHumanoComponent } from './projeto/iniciado/registro-refp-details/registro-recurso-humano/registro-recurso-humano.component';



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
        ListComponent,
        // Projeto Single
        InfoComponent,
        TemasComponent,
        ProjetoComponent,
        ProdutosComponent,
        EtapasComponent,
        EmpresasComponent,
        RecursosHumanosComponent,
        AlocacaoHumanoComponent,
        RecursosMateriaisComponent,
        AlocacaoMaterialComponent,
        ExtratoFinanceiroEmpresasComponent,
        ExtratoFinanceiroEtapasComponent,
        CentralAdministrativaComponent,
        GeracaoXmlComponent,
        LogsDutoComponent,
        RepositorioXmlComponent,
        AlterarStatusComponent,
        UsuariosComponent,
        LogProjetoComponent,
        LogComponent,
        SubTemasComponent,
        RefpInserirComponent,
        RefpListComponent,
        RefpExtratoComponent,
        AlterarProjetoComponent,
        ConsultarDadosComponent,
        RecursoHumanoComponent,
        RecursoMaterialComponent,
        RegistroRefpDetailsComponent,
        RegistroRecursoHumanoComponent,
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
        RegistroRefpDetailsComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
    providers: [ProjetosService],
    exports: [
        NovoProjetoComponent,
        ProjetoCardComponent,
        ListComponent,
        ProjetoComponent,
        ProdutosComponent,
        EtapasComponent,
        EmpresasComponent,
        RecursosHumanosComponent,
        AlocacaoHumanoComponent,
        RecursosMateriaisComponent,
        AlocacaoMaterialComponent,
        ExtratoFinanceiroEmpresasComponent,
        ExtratoFinanceiroEtapasComponent,
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
