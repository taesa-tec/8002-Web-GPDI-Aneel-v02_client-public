import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-recursos-humanos',
    templateUrl: './recursos-humanos.component.html',
    styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent extends BaseComponent implements OnInit {

    modalComponent = RecursoHumanoFormComponent;

    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {
        
    }

    ngOnInit() {
    }

}
