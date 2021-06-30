import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisesResolver } from '@app/resolvers/paises.resolver';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: ListaComponent,
    resolve: {
      paises: PaisesResolver,
      producoes: 'producoesCientificas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducaoCientificaRoutingModule { }
