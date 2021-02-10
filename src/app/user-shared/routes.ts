import {AuthGuard} from '@app/auth';
import {Route} from '@angular/router';


export const MeuCadastroRoute: Route = {
  path: 'meu-cadastro',
  canActivate: [AuthGuard],
  loadChildren: () => import('@app/user-shared/meu-cadastro/meu-cadastro.module').then(m => m.MeuCadastroModule)

};
