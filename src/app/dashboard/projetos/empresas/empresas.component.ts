import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaFormComponent } from '@app/projetos/empresa-form/empresa-form.component';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent {

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }

    openModal(empresa_id: number) {
        const modalRef = this.modalService.open(EmpresaFormComponent, { size: 'lg' });
        modalRef.componentInstance.empresa_id = empresa_id;
    }

}
