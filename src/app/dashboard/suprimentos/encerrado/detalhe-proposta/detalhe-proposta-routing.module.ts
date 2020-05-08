import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhePropostaComponent } from './detalhe-proposta.component';


const routes: Routes = [
  {
    path: '',
    component: DetalhePropostaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhePropostaRoutingModule { }
