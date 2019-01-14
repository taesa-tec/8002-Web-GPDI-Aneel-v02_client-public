import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './projeto/info/info.component';
import { TemasComponent } from './projeto/temas/temas.component';
import { ProdutosComponent } from './projeto/produtos/produtos.component';
import { EtapasComponent } from './projeto/etapas/etapas.component';
import { EmpresasComponent } from './projeto/empresas/empresas.component';
import { RecursosHumanosComponent } from './projeto/recursos-humanos/recursos-humanos.component';
import { AlocacaoRecursosHumanosComponent } from './projeto/alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import { RecursosMateriaisComponent } from './projeto/recursos-materiais/recursos-materiais.component';
import { AlocacaoRecursosMateriaisComponent } from './projeto/alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import { ExtratoFinanceiroEmpresaComponent } from './projeto/extrato-financeiro-empresa/extrato-financeiro-empresa.component';
import { ExtratoFinanceiroEtapasComponent } from './projeto/extrato-financeiro-etapas/extrato-financeiro-etapas.component';
import { CentralAdministrativaComponent } from './projeto/central-administrativa/central-administrativa.component';
import { LogComponent } from './projeto/log/log.component';



@NgModule({
    declarations: [MeusProjetosComponent, NovoProjetoComponent, ProjetoCardComponent, ProjetoComponent, InfoComponent, TemasComponent, ProdutosComponent, EtapasComponent, EmpresasComponent, RecursosHumanosComponent, AlocacaoRecursosHumanosComponent, RecursosMateriaisComponent, AlocacaoRecursosMateriaisComponent, ExtratoFinanceiroEmpresaComponent, ExtratoFinanceiroEtapasComponent, CentralAdministrativaComponent, LogComponent],
    entryComponents: [NovoProjetoComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule 
    ]
})
export class ProjetosModule { }
