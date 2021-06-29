import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisesResolver } from '@app/resolvers/paises.resolver';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: '',
    component: ListaComponent,
    resolve: {
      paises: PaisesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoCientificoRoutingModule { }
