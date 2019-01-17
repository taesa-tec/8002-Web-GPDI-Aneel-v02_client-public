import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterialFormComponent } from '@app/projetos/recurso-material-form/recurso-material-form.component';

@Component({
    selector: 'app-recursos-materiais',
    templateUrl: './recursos-materiais.component.html',
    styleUrls: ['./recursos-materiais.component.scss']
})
export class RecursosMateriaisComponent extends BaseComponent implements OnInit {

    modalComponent = RecursoMaterialFormComponent;

    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {

    }

    ngOnInit() {
    }

}
