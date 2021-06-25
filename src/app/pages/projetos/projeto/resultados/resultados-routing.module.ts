import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'capacitacao'
  },
  {
    path: 'capacitacao',
    loadChildren: () => import('./capacitacao/capacitacao.module').then(m => m.CapacitacaoModule)
  },
  {
    path: 'cientifica',
    loadChildren: () => import('./tecnico-cientifico/tecnico-cientifico.module').then(m => m.TecnicoCientificoModule)
  },
  {
    path: 'apoio',
    loadChildren: () => import('./apoio/apoio.module').then(m => m.ApoioModule)
  },
  {
    path: 'intelectual',
    loadChildren: () => import('./propriedade-intelectual/propriedade-intelectual.module').then(m => m.PropriedadeIntelectualModule)
  },
  {
    path: 'socioambientais',
    loadChildren: () => import('./socioambientais/socioambientais.module').then(m => m.SocioambientaisModule)
  },
  {
    path: 'economicos',
    loadChildren: () => import('./economicos/economicos.module').then(m => m.EconomicosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
