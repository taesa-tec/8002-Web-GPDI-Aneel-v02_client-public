import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { DetalhesDemandaComponent } from './detalhes-demanda.component';
import { DetalhesDemandaRoutingModule } from './detalhes-demanda-routing.module';
import { ModalDemandaComponent } from './modal-demanda/modal-demanda.component';


@NgModule({
  declarations: [
    DetalhesDemandaComponent,
    ModalDemandaComponent
  ],
  imports: [
    SharedModule,
    DetalhesDemandaRoutingModule
  ]
})
export class DetalhesDemandaModule { }
