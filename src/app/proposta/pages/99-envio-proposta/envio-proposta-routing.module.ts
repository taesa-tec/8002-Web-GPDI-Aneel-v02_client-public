import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnvioPropostaComponent} from '@app/proposta/pages/99-envio-proposta/envio-proposta.component';
import {PropostaDocumentoResolver, PropostaErrosResolver} from '@app/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: EnvioPropostaComponent,
    resolve: {
      documento: PropostaDocumentoResolver,
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioPropostaRoutingModule {
}
