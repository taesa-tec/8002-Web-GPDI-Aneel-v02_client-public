import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MeuCadastroComponent} from '@app/user-shared/meu-cadastro/meu-cadastro.component';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';


const routes: Routes = [
  {
    path: '',
    component: MeuCadastroComponent,
    resolve: {
      empresas: EmpresasResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuCadastroRoutingModule {
}
