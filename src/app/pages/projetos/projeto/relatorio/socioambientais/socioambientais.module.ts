import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocioambientaisRoutingModule } from './socioambientais-routing.module';
import { ListaComponent } from './lista/lista.component';
import { EditorComponent } from './editor/editor.component';
import { CoreModule } from '@app/core';
import { RelatorioResolver } from '../../resolvers/relatorio.resolver';


@NgModule({
  declarations: [ListaComponent, EditorComponent],
  imports: [
    CommonModule,
    SocioambientaisRoutingModule,
    CoreModule
  ],
  providers: [
    RelatorioResolver.ToType('Socioambiental', 'socioambientais'),
  ]
})
export class SocioambientaisModule { }
