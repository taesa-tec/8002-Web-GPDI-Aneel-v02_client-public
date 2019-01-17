import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from '@app/projetos/produto-form/produto-form.component';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }
    openFormProduto(produtoId = null) {
        const modalRef = this.modalService.open(ProdutoFormComponent, { size: 'lg' });

        if (produtoId) {
            modalRef.componentInstance.produto_id = produtoId;
        }
    }


    ngOnInit() {
    }

}
