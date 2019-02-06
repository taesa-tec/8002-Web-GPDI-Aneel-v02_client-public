import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Routes, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import filter from "lodash-es/filter";
import { Projeto, ProjetoStatus } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

import { projetoPlanejamentoRoutes } from '@app/projetos/projeto-routings';
import { ProjetosService } from '@app/projetos/projetos.service';


@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit, AfterViewInit {

  @ViewChildren(LoadingComponent) sidebarsLoading !: QueryList<LoadingComponent>;

  projetoPlanejamentoRoutes: Routes;
  projeto: Projeto;


  constructor(private route: ActivatedRoute, private projetoService: ProjetosService) {
    this.projetoPlanejamentoRoutes = filter(projetoPlanejamentoRoutes, (r => r.path !== "**" && r.path.length > 0));
  }
  get routes() {
    return this.projetoPlanejamentoRoutes;
  }

  getProjeto() {
    const id = +this.route.snapshot.paramMap.get('id');
    const self = this;
    return new Observable(observer => {

      this.projetoService.getById(id).subscribe({
        next(projeto) {
          console.log(projeto);

          self.projeto = projeto;
          observer.next();
        },
        error() {
          observer.error();
        }
      });
    });


  }
  ngOnInit() {
    this.route.data.subscribe((data: { projeto: Projeto }) => this.projeto = data.projeto);

  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   if (this.sidebarsLoading) {
    //     this.sidebarsLoading.forEach(l => l.show());
    //   }
    //   this.getProjeto().subscribe(() => {
    //     this.sidebarsLoading.forEach(l => l.hide());
    //   });
    // }, 0);
  }

}
