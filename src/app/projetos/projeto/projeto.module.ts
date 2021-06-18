import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjetoRoutingModule} from './projeto-routing.module';
import {ProjetoComponent} from './projeto.component';
import {DashboardModule} from '@app/dashboard';
import {TesteComponent} from './components/teste/teste.component';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {ProjetoResolver, ProjetoStatusResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';
import {PipesModule} from '@app/core/pipes';
import {NovoRegistroResolver} from '@app/projetos/projeto/resolvers/novo-registro.resolver';
import {RegistroResolver, RegistrosResolver} from '@app/projetos/projeto/resolvers/registros.resolver';
import {ExtratoFinanceiroComponent} from './extrato-financeiro/extrato-financeiro.component';
import {ExtratoFinanceiroResolver} from '@app/projetos/projeto/resolvers/extrato-financeiro.resolver';
import {ComponentsModule} from '@app/core/components';
import {ScreensModule} from '@app/core/screens/screens.module';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [ProjetoComponent, TesteComponent, ExtratoFinanceiroComponent, HomeComponent],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    DashboardModule,
    PipesModule,
    ScreensModule,
    ComponentsModule
  ],
  providers: [
    ProjetoService,
    ProjetoResolver,
    RegistrosResolver,
    RegistroResolver,
    NovoRegistroResolver,
    ExtratoFinanceiroResolver,
    ProjetoStatusResolver.Status('Execucao', 'projetoExecucao'),
    ProjetoStatusResolver.Status('Finalizado', 'projetoFinalizado'),
  ]
})
export class ProjetoModule {
}
