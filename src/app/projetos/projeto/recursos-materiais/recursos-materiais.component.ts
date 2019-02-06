import { Component, OnInit } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterialFormComponent } from '@app/projetos/recurso-material-form/recurso-material-form.component';

@Component({
    selector: 'app-recursos-materiais',
    templateUrl: './recursos-materiais.component.html',
    styleUrls: ['./recursos-materiais.component.scss']
})
export class RecursosMateriaisComponent {

    constructor(protected projetoService: ProjetosService, protected modalService: NgbModal) { }

    openModal(etapa_id: number) {
        const modalRef = this.modalService.open(RecursoMaterialFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa_id = etapa_id;
    }
}
