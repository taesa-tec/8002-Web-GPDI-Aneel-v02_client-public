import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewContratoComponent} from './view-contrato/view-contrato.component';
import {ContratoResolver} from '@app/pages/propostas/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: ViewContratoComponent,
    resolve: {
      contrato: ContratoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidacaoContratosRoutingModule {
}
