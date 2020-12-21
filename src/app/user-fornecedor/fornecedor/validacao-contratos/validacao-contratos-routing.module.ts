import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContratoComponent } from './view-contrato/view-contrato.component';
import { ValidacaoContratosComponent } from './validacao-contratos.component';


const routes: Routes = [
  {
    path: '',
    component: ValidacaoContratosComponent,
  },
  {
    path: ':id',
    component: ViewContratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidacaoContratosRoutingModule { }
