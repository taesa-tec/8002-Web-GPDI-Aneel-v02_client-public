import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AlocarRecursoHumanoFormComponent } from '@app/projetos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent extends BaseComponent implements OnInit {

    modalComponent = AlocarRecursoHumanoFormComponent;
    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {
        
    }

    ngOnInit() {
    }

}
