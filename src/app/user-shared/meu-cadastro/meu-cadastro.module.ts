import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MeuCadastroRoutingModule} from './meu-cadastro-routing.module';
import {MeuCadastroComponent} from '@app/user-shared/meu-cadastro/meu-cadastro.component';
import {UsersService} from '@app/services';
import {CoreModule} from '@app/core';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';


@NgModule({
  declarations: [MeuCadastroComponent],
  imports: [
    CommonModule,
    CoreModule,
    MeuCadastroRoutingModule
  ],
  providers: [EmpresasResolver]

})
export class MeuCadastroModule {
}
