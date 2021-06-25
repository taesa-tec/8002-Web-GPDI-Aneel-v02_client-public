import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioRoutingModule } from './relatorio-routing.module';
import { FinalComponent } from './final/final.component';


@NgModule({
  declarations: [FinalComponent],
  imports: [
    CommonModule,
    RelatorioRoutingModule
  ]
})
export class RelatorioModule { }
