import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapaRoutingModule } from './etapa-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';
import { RelatorioResolver } from '../../resolvers/relatorio.resolver';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    EtapaRoutingModule,
    CoreModule
  ],
  providers: [
    RelatorioResolver.ToType('RelatorioEtapa', 'relatoriosEtapa')
  ]
})
export class EtapaModule { }
