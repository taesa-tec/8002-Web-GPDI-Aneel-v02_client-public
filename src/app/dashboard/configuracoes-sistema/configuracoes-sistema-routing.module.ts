import {PadraoFormulariosComponent} from './padrao-formularios/padrao-formularios.component';
import {EquipeComponent} from './equipe/equipe.component';
import {ConfiguracoesSistemaComponent} from './configuracoes-sistema.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormEditorComponent} from '@app/dashboard/configuracoes-sistema/form-editor/form-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesSistemaComponent,
    children: [
      {
        path: '',
        redirectTo: 'equipe-ped',
        pathMatch: 'full',
      },
      {
        path: 'equipe-ped',
        component: EquipeComponent
      },
      {
        path: 'padrao-formularios',
        component: PadraoFormulariosComponent
      },
      {
        path: 'padrao-formularios/:key',
        component: FormEditorComponent
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesSistemaRoutingModule {
}
