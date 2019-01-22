import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from '@app/projetos/produto-form/produto-form.component';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }

    openModal(produto_id: number) {
        const modalRef = this.modalService.open(ProdutoFormComponent, { size: 'lg' });
        modalRef.componentInstance.produto_id = produto_id;
    }
}
