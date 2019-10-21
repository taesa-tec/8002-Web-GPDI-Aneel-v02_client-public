import { PadraoFormulariosComponent } from './padrao-formularios/padrao-formularios.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ConfiguracoesSistemaComponent } from './configuracoes-sistema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarFormulariosComponent } from './padrao-formularios/editar-formularios/editar-formularios.component';

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
        path: 'padrao-formularios/:id',
        component: EditarFormulariosComponent
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesSistemaRoutingModule { }
