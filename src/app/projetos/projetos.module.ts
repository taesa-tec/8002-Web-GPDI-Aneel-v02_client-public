import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { SharedModule } from '../shared/shared.module';
import { ProjetosService } from './projetos.service';

import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { ListComponent } from './list/list.component';

// Projeto Page
import { ProjetoComponent } from '@app/projetos/projeto/projeto.component';


// Common
import { AlocarRecursoHumanoFormComponent } from '@app/projetos/projeto/common/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/projeto/common/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { EmpresaFormComponent } from '@app/projetos/projeto/common/empresa-form/empresa-form.component';
import { EtapaFormComponent } from '@app/projetos/projeto/common/etapa-form/etapa-form.component';
import { ProdutoFormComponent } from '@app/projetos/projeto/common/produto-form/produto-form.component';
import { RecursoHumanoFormComponent } from '@app/projetos/projeto/common/recurso-humano-form/recurso-humano-form.component';
import { RecursoMaterialFormComponent } from '@app/projetos/projeto/common/recurso-material-form/recurso-material-form.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/common/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/common/recursos-materiais/recursos-materiais.component';

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
import { AlocacaoComponent as AlocacaoHumanoComponent } from '@app/projetos/projeto/proposta/recursos-humanos/alocacao.component';
import { AlocacaoComponent as AlocacaoMaterialComponent } from '@app/projetos/projeto/proposta/recursos-materiais/alocacao.component';
import { OrcamentoEmpresasComponent } from '@app/projetos/projeto/proposta/orcamento-empresas/orcamento-empresas.component';
import { OrcamentoEtapasComponent } from '@app/projetos/projeto/proposta/orcamento-etapas/orcamento-etapas.component';

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
import { RegistroRecursoMaterialComponent } from './projeto/iniciado/registro-refp-details/registro-recurso-material/registro-recurso-material.component';
import { ProrrogarComponent } from './projeto/iniciado/prorrogar/prorrogar.component';
import { PropostaBaseComponent } from './projeto/iniciado/proposta-base/proposta-base.component';
import { ExtratoFinanceiroEmpresasComponent } from './projeto/iniciado/extrato-financeiro-empresas/extrato-financeiro-empresas.component';



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
        OrcamentoEmpresasComponent,
        OrcamentoEtapasComponent,
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
        RegistroRecursoMaterialComponent,
        ProrrogarComponent,
        PropostaBaseComponent,
        ExtratoFinanceiroEmpresasComponent,
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
        OrcamentoEmpresasComponent,
        OrcamentoEtapasComponent,
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
