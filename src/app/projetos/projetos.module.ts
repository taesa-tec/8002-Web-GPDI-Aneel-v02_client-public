import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjetosRoutingModule} from './projetos-routing.module';
import {EmExecucaoComponent} from './em-execucao/em-execucao.component';
import {EmFinalizacaoComponent} from './em-finalizacao/em-finalizacao.component';
import {ServiceBase} from '@app/services';
import {ProjetosResolver} from '@app/projetos/projetos.resolver';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [EmExecucaoComponent, EmFinalizacaoComponent],
  imports: [
    CommonModule,
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
