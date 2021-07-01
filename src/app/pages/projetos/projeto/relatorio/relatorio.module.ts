import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioRoutingModule } from './relatorio-routing.module';
import { FinalComponent } from './final/final.component';
import { CoreModule } from '@app/core';
import { RelatorioResolver } from '../resolvers/relatorio.resolver';


@NgModule({
  declarations: [FinalComponent],
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    CoreModule
  ],
  providers: [
    RelatorioResolver.ToType('RelatorioFinal', 'relatorioFinal'),
  ]
})
export class RelatorioModule { }
