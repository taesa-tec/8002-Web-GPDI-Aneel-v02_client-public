import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlteracaoPropostaComponent } from './alteracao-proposta.component';


const routes: Routes = [
  {
    path: '',
    component: AlteracaoPropostaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlteracaoPropostaRoutingModule { }
