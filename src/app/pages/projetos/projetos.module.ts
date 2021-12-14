import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjetosRoutingModule} from './projetos-routing.module';
import {EmExecucaoComponent} from './em-execucao/em-execucao.component';
import {EmFinalizacaoComponent} from './em-finalizacao/em-finalizacao.component';
import {ServiceBase} from '@app/services';
import {ProjetosResolver} from '@app/pages/projetos/projetos.resolver';
import {CoreModule} from '@app/core';
import {ProjetoModule} from '@app/pages/projetos/projeto/projeto.module';
import {ScreensModule} from '@app/core/screens/screens.module';


@NgModule({
  declarations: [EmExecucaoComponent, EmFinalizacaoComponent],
  imports: [
    ScreensModule,
    CommonModule,
    ProjetoModule,
    ProjetosRoutingModule,
    CoreModule
  ],
  providers: [
    ServiceBase.fromAppend('Projetos'),
    ProjetosResolver
  ]
})
export class ProjetosModule {
}
