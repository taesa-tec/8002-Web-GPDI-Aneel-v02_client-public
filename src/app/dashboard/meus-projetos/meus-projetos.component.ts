import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '@app/projetos/novo-projeto/novo-projeto.component';
import { Projeto } from '@app/models';
import { Empresa } from '@app/models';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { of, merge, Observable, interval, zip } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.component.html',
  styleUrls: ['./meus-projetos.component.scss']
})
export class MeusProjetosComponent implements OnInit {

  projetos: Projeto[];

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    protected catalogs: CatalogsService,
    protected projetoService: ProjetosService,
    protected modalService: NgbModal) {
    this.projetos = [];
  }

  openNovoProjeto() {
    this.modalService.open(NovoProjetoComponent, { size: 'lg' }).result.then(value => {
      if (value.sucesso) {
        this.loadData();
      }
    }).catch(reason => {

    });

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.loading.show();
    zip(this.getProjetos()).subscribe(() => {
      this.loading.hide();
    });
  }

  getProjetos() {
    return new Observable((ob) => {
      this.projetoService.meusProjetos()
        // this.projetoService.getProjetos()
        .subscribe(p$ => {
          this.projetos = p$.map(p$ => p$.projeto);
          ob.next();
        });
    });
  }


}
