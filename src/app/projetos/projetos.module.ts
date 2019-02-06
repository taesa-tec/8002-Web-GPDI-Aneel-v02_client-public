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
import { InfoComponent } from '@app/projetos/projeto/info/info.component';
import { TemasComponent } from '@app/projetos/projeto/temas/temas.component';

import { ProdutosComponent } from '@app/projetos/projeto/produtos/produtos.component';
import { EtapasComponent } from '@app/projetos/projeto/etapas/etapas.component';
import { EmpresasComponent } from '@app/projetos/projeto/empresas/empresas.component';
import { RecursosHumanosComponent } from '@app/projetos/projeto/recursos-humanos/recursos-humanos.component';
import { AlocacaoComponent as AlocacaoHumanoComponent } from '@app/projetos/projeto/recursos-humanos/alocacao.component';
import { RecursosMateriaisComponent } from '@app/projetos/projeto/recursos-materiais/recursos-materiais.component';
import { AlocacaoComponent as AlocacaoMaterialComponent } from '@app/projetos/projeto/recursos-materiais/alocacao.component';
import { ExtratoFinanceiroEmpresasComponent } from '@app/projetos/projeto/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from '@app/projetos/projeto/extrato-financeiro-etapas/extrato-financeiro-etapas.component';
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
