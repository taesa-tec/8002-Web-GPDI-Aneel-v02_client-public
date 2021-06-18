import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CondicoesComponent} from './condicoes.component';
import {CondicoesResolver} from '@app/pages/propostas/proposta/resolvers';


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
