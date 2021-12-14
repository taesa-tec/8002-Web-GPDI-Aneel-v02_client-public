import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecursosMateriaisComponent} from '@app/pages/propostas/proposta/pages/12-recursos-materiais/recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {CategoriasContabeisResolver} from '@app/resolvers/categorias-contabeis.resolver';


const routes: Routes = [{
  path: '',
  component: RecursosMateriaisComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver,
    categorias: CategoriasContabeisResolver
  },
  runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosMateriaisRoutingModule {
}
