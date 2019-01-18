import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { ProjetoComponent } from './projetos/projeto.component';
import { InfoComponent } from './projetos/info/info.component';
import { TemasComponent } from './projetos/temas/temas.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';
import { ProjetosModule } from '@app/projetos/projetos.module';
import { ProdutosComponent } from './projetos/produtos/produtos.component';
import { BlankComponent } from './projetos/blank/blank.component';
import { EtapasComponent } from './projetos/etapas/etapas.component';
import { EmpresasComponent } from './projetos/empresas/empresas.component';
import { RecursosHumanosComponent } from './projetos/recursos-humanos/recursos-humanos.component';
import { BaseComponent } from './projetos/base/base.component';
import { AlocacaoComponent as AlocacaoHumanoComponent } from './projetos/recursos-humanos/alocacao.component';
import { RecursosMateriaisComponent } from './projetos/recursos-materiais/recursos-materiais.component';
import { AlocacaoComponent as AlocacaoMaterialComponent } from './projetos/recursos-materiais/alocacao.component';
import { ExtratoFinanceiroEmpresasComponent } from './projetos/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import { ExtratoFinanceiroEtapasComponent } from './projetos/extrato-financeiro-etapas/extrato-financeiro-etapas.component';
import { CentralAdministrativaComponent } from './projetos/central-administrativa/central-administrativa.component';

@NgModule({
    declarations: [
        DashboardComponent,
        MeuCadastroComponent,
        NotFoundComponent,
        GerenciarUsuariosComponent,
        MeusProjetosComponent,
        ProjetoComponent,
        InfoComponent,
        TemasComponent,
        ProdutosComponent,
        BlankComponent,
        EtapasComponent,
        EmpresasComponent,
        RecursosHumanosComponent,
        AlocacaoHumanoComponent,
        RecursosMateriaisComponent,
        AlocacaoMaterialComponent,
        ExtratoFinanceiroEmpresasComponent,
        ExtratoFinanceiroEtapasComponent,
        CentralAdministrativaComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        ProjetosModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
