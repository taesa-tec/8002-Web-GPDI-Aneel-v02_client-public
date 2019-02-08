import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from '@app/projetos/produto-form/produto-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { map } from 'rxjs/operators';
import { Projeto, Produto } from '@app/models';
import { zip } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: Array<any>;
  projeto: Projeto;

  listOrder: { field: string; direction: 'asc' | 'desc'; } = {
    field: 'titulo',
    direction: 'asc'
  };

  constructor(
    private app: AppService,
    private route: ActivatedRoute,
    private projetoService: ProjetosService,
    protected catalogo: CatalogsService,
    protected modalService: NgbModal) {
  }


  openModal(produto: Produto | {} = {}) {
    const modalRef = this.modalService.open(ProdutoFormComponent, { size: 'lg' });
    modalRef.componentInstance.produto = produto;
    modalRef.componentInstance.projeto = this.projeto;

    modalRef.result.then(result => {
      this.loadProdutos();
    }, e => {

    });

  }

  ngOnInit() {

    const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));

    zip(projeto$).subscribe(([projeto]) => {
      this.projeto = projeto;
      this.loadProdutos();
    });
  }

  order(data: { field: string; direction: 'asc' | 'desc'; }) {
    this.listOrder = data;
  }

  loadProdutos() {
    this.projetoService.getProdutos(this.projeto.id).subscribe(produtos => this.produtos = produtos || []);
  }
}
