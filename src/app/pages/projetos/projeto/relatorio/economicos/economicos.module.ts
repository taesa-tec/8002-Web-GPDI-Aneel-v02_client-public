import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicosRoutingModule } from './economicos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';
import { RelatorioResolver } from '../../resolvers/relatorio.resolver';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    EconomicosRoutingModule,
    CoreModule
  ],
  providers: [
    RelatorioResolver.ToType('IndicadorEconomico', 'indicadoresEconomicos'),
  ]
})
export class EconomicosModule { }
