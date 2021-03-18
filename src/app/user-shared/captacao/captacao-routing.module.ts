import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CaptacaoComponent} from '@app/user-shared/captacao/captacao.component';
import {CaptacoesResolver} from '@app/resolvers/captacoes.resolver';
import {ListComponent} from '@app/user-shared/captacao/list/list.component';
import {CaptacaoButtons, CaptacaoCols} from '@app/user-shared/captacao/commons';
import {RedirectByRoleComponent, RolePaths} from '@app/dashboard/shared/components';
import {UserRole} from '@app/commons';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

const rolePaths: RolePaths = [
  {path: 'pendente', priority: 10, role: [UserRole.Administrador, UserRole.User]},
  {path: 'elaborar', priority: 10, role: UserRole.Suprimento},
];

const routes: Routes = [
  {
    path: '',
    component: CaptacaoComponent,
    children: [
      {
        path: '',
        //redirectTo: 'pendente',
        component: RedirectByRoleComponent,
        data: {
          rolePaths
        },
        pathMatch: 'full',
      },
      {
        path: 'pendente',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Pendente,
            buttons: CaptacaoButtons.Pendente,
            status: 'Pendentes'
          }
        }
      },
      {
        path: 'elaboracao',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.EmElaboracao,
            buttons: [],
            status: 'Elaboracao'
          }
        }
      },
      {
        path: 'elaborar',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.EmElaboracao,
            buttons: CaptacaoButtons.EmElaboracao,
            status: 'Elaboracao'
          }
        }
      },
      {
        path: 'aberta',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Aberta,
            buttons: CaptacaoButtons.Aberta,
            status: 'Abertas'
          }
        }
      },
      {
        path: 'encerrada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Encerrada,
            buttons: CaptacaoButtons.Encerrada,
            status: 'Encerradas'
          }
        }
      },
      {
        path: 'cancelada',
        component: ListComponent,
        resolve: {
          captacoes: CaptacoesResolver
        },
        data: {
          captacaoTable: {
            cols: CaptacaoCols.Cancelada,
            buttons: CaptacaoButtons.Cancelada,
            status: 'Canceladas'
          }
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacaoRoutingModule {
}

const v = {
  dom: {
    ctrl1: '',
    ctrl2: '',
    ctrl3: '',
    ctrl4: '',
    ctrl5: '',
    ctrl6: '',
  },
  seg: {
    ctrl1: '',
    ctrl2: '',
    ctrl3: '',
    ctrl4: '',
    ctrl5: '',
    ctrl6: '',
  },
  ter: {
    ctrl1: '',
    ctrl2: '',
    ctrl3: '',
    ctrl4: '',
    ctrl5: '',
    ctrl6: '',
  },

};
const a = new FormArray([
  new FormGroup({
    dia: new FormControl('Dom'),
    //outros controles
  }),
  new FormGroup({
    dia: new FormControl('Seg'),
    //outros controles
  }),
  new FormGroup({
    dia: new FormControl('Ter'),
    //outros controles
  })
]);
