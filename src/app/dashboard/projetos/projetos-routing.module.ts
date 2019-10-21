import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProjetosComponent } from '../shared/lista-projetos/lista-projetos.component';


const routes: Routes = [
  {
    path: "proposta",
    component: ListaProjetosComponent,
    data: {
      titulo: "Projetos - Etapa Proposta",
      projetoStatus: "Proposta"
    }
  },
  {
    path: "iniciado",
    component: ListaProjetosComponent,
    data: {
      titulo: "Projetos Em Execução",
      projetoStatus: "Iniciado"
    }
  },
  {
    path: "encerrado",
    component: ListaProjetosComponent,
    data: {
      titulo: "Projetos em Finalização",
      projetoStatus: "Encerrado"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule { }
