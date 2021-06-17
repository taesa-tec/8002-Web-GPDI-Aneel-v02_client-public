import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdministrativoComponent} from '@app/projetos/projeto/administrativo/administrativo.component';
import {DebugComponent} from '@app/core/screens/debug.component';
import {LogsDutoComponent} from '@app/projetos/projeto/administrativo/logs-duto/logs-duto.component';
import {RepositorioXmlComponent} from '@app/projetos/projeto/administrativo/repositorio-xml/repositorio-xml.component';
import {AlterarSatusComponent} from '@app/projetos/projeto/administrativo/alterar-satus/alterar-satus.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      {
        path: '',
        redirectTo: 'logs-duto'
      }, {
        path: 'logs-duto',
        component: LogsDutoComponent,
        resolve: {
          logs: 'projetoLogsDuto'
        }
      }, {
        path: 'repositorio-xml',
        component: RepositorioXmlComponent,
        resolve: {
          xmls: 'projetoXmls',
        }
      }, {
        path: 'status',
        component: AlterarSatusComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule {
}
