import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducaoCientificaRoutingModule } from './producao-cientifica-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';
import { RelatorioResolver } from '../../resolvers/relatorio.resolver';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    ProducaoCientificaRoutingModule,
    CoreModule
  ],
  providers: [
    RelatorioResolver.ToType('ProducaoCientifica', 'producoesCientificas'),
  ]
})
export class ProducaoCientificaModule { }
