import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: ListaComponent,
    resolve: {
      apoios: 'apoios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApoioRoutingModule { }
