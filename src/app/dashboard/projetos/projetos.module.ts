import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProjetosRoutingModule
  ]
})
export class ProjetosModule { }
