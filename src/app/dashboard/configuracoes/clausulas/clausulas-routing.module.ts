import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClausulasComponent} from '@app/dashboard/configuracoes/clausulas/clausulas.component';
import {ClausulasResolver} from '@app/dashboard/configuracoes/clausulas/clausulas.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      clausulas: ClausulasResolver
    },
    component: ClausulasComponent
  }
  // ...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClausulasRoutingModule {
}
