import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MeuCadastroComponent} from '@app/user-shared/meu-cadastro/meu-cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: MeuCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuCadastroRoutingModule {
}
