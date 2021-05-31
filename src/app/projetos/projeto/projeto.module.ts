import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjetoRoutingModule} from './projeto-routing.module';
import {ProjetoComponent} from './projeto.component';
import {DashboardModule} from '@app/dashboard';
import {TesteComponent} from './components/teste/teste.component';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {ProjetoResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';
import {PipesModule} from '@app/core/pipes';


@NgModule({
  declarations: [ProjetoComponent, TesteComponent],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    DashboardModule,
    PipesModule
  ],
  providers: [
    ProjetoService,
    ProjetoResolver
  ]
})
export class ProjetoModule {
}
