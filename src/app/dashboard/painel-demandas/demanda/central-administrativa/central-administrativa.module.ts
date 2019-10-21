import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralAdministrativaRoutingModule } from './central-administrativa-routing.module';
import { StatusDemandaComponent } from './status-demanda/status-demanda.component';
import { CentralAdministrativaComponent } from './central-administrativa.component';

@NgModule({
  declarations: [StatusDemandaComponent,CentralAdministrativaComponent],
  imports: [
    CommonModule,
    CentralAdministrativaRoutingModule
  ]
})
export class CentralAdministrativaModule { }
