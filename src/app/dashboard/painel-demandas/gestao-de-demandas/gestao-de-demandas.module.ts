import { NovaDemandaComponent } from './nova-demanda/nova-demanda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestaoDeDemandasRoutingModule } from './gestao-de-demandas-routing.module';
import { ReprovadasComponent } from './reprovadas/reprovadas.component';
import { EnviadasParaCaptacaoComponent } from './enviadas-para-captacao/enviadas-para-captacao.component';
import { AprovadasComponent } from './aprovadas/aprovadas.component';
import { GestaoDeDemandasComponent } from './gestao-de-demandas.component';
import { SharedModule } from '@app/core/shared/shared.module';
import { ElaboracaoComponent } from './elaboracao/elaboracao.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ReprovadasComponent,
    EnviadasParaCaptacaoComponent,
    AprovadasComponent,
    GestaoDeDemandasComponent,
    ElaboracaoComponent,
    NovaDemandaComponent,
  ],
  exports: [
    GestaoDeDemandasComponent
  ],
  entryComponents: [
    NovaDemandaComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestaoDeDemandasRoutingModule,
    ReactiveFormsModule,
  ]
})
export class GestaoDeDemandasModule { }
