import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CondicoesComponent} from '@app/user-fornecedor/propostas/proposta/02-condicoes/condicoes.component';
import {CondicoesResolver} from '@app/user-fornecedor/resolvers/condicoes.resolver';


const routes: Routes = [{
  path: '',
  component: CondicoesComponent,
  resolve: {
    clausulas: CondicoesResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicoesRoutingModule {
}
