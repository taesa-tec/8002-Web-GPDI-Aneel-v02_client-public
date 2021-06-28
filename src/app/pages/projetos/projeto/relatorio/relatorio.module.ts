import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioRoutingModule } from './relatorio-routing.module';
import { FinalComponent } from './final/final.component';
import { CoreModule } from '@app/core';


@NgModule({
  declarations: [FinalComponent],
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    CoreModule
  ]
})
export class RelatorioModule { }
