import {Route} from '@angular/router';


export const MeuCadastroRoute: Route = {
  path: 'meu-cadastro',
  canActivate: ['logged'],
  loadChildren: () => import('@app/meu-cadastro/meu-cadastro.module').then(m => m.MeuCadastroModule)

};
