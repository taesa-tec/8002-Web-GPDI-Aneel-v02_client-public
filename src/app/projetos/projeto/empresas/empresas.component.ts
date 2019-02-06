import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaFormComponent } from '@app/projetos/empresa-form/empresa-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent {

    constructor(protected projetosService: ProjetosService, protected modalService: NgbModal) { }

    openModal(empresa_id: number) {
        const modalRef = this.modalService.open(EmpresaFormComponent, { size: 'lg' });
        modalRef.componentInstance.empresa_id = empresa_id;
    }

}
