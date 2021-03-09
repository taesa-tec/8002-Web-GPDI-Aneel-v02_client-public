import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnvioPropostaComponent} from '@app/user-fornecedor/propostas/proposta/99-envio-proposta/envio-proposta.component';
import {PropostaDocumentoResolver, PropostaErrosResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';


const routes: Routes = [
  {
    path: '',
    component: EnvioPropostaComponent,
    resolve: {
      documento: PropostaDocumentoResolver,
      erros: PropostaErrosResolver
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioPropostaRoutingModule {
}
