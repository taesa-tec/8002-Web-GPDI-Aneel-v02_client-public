import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanoTrabalhoComponent} from '@app/proposta/pages/05-plano-trabalho/plano-trabalho.component';
import {PlanoTrabalhoResolver} from '@app/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: PlanoTrabalhoComponent,
    resolve: {
      plano: PlanoTrabalhoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoTrabalhoRoutingModule {
}
