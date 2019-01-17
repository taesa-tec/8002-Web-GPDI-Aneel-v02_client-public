import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EtapaFormComponent } from '@app/projetos/etapa-form/etapa-form.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent extends BaseComponent implements OnInit {

    modalComponent = EtapaFormComponent;

    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }

    modalSetup(modalRef: NgbModalRef, args) {
        // modalRef.componentInstance.etapa_id = args[0];
    }



    ngOnInit() {
    }

}
