import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from '@app/projetos/produto-form/produto-form.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent extends BaseComponent implements OnInit {

    modalComponent = ProdutoFormComponent;

    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {
        modalRef.componentInstance.produto_id = args[0];
    }

    ngOnInit() {
    }

}
