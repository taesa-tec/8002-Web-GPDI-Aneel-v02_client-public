import { Component, OnInit } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { BaseComponent } from '../base/base.component';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent extends BaseComponent implements OnInit {

    modalComponent = AlocarRecursoMaterialFormComponent;
    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {

    }

    ngOnInit() {
    }

}
