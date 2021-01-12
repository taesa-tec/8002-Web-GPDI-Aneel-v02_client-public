import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetalhesDemandaComponent} from '@app/user-fornecedor/propostas/proposta/01-detalhes-demanda/detalhes-demanda.component';


const routes: Routes = [{
  path: '',
  component: DetalhesDemandaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesDemandaRoutingModule {
}
