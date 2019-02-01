import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '@app/projetos/novo-projeto/novo-projeto.component';
import { Projeto } from '@app/models';
import { Empresa } from '@app/models';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.component.html',
  styleUrls: ['./meus-projetos.component.scss']
})
export class MeusProjetosComponent implements OnInit {

  projetos: Projeto[];
  status: Array<any>;

  empresas: Array<Empresa>;
  empresaSelected = '';
  total_projetos = 0;
  meusProjetos: Array<any>;


  constructor(
    protected catalogs: CatalogsService,
    protected projetoService: ProjetosService,
    protected modalService: NgbModal) {
    this.projetos = [];
  }

  openNovoProjeto() {
    const modalRef = this.modalService.open(NovoProjetoComponent, { size: 'lg' });
  }

  getProjetos() {
    // this.projetoService.meusProjetos().subscribe(p => {
    this.projetoService.getProjetos().subscribe(p => {
      console.log(p);
      
      this.projetos = p;
      this.total_projetos = this.projetos.length;
    });
  }

  ngOnInit() {
    // Carregar os projetos
    this.getProjetos();

    this.catalogs.status().subscribe(r => {

    });
    this.catalogs.empresas().subscribe(r => {
      this.empresas = r;
    });



  }

}
