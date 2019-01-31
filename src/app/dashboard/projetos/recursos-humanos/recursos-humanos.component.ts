import { Component, OnInit } from '@angular/core';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-recursos-humanos',
    templateUrl: './recursos-humanos.component.html',
    styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent {

    constructor(protected projetoService: ProjetosService, protected modalService: NgbModal) { }

    openModal(recurso_id: number) {
        const modalRef = this.modalService.open(RecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.recurso_id = recurso_id;
    }

}
