import { Component, OnInit } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from '@app/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent {

    constructor(protected projetoService: ProjetosService, protected modalService: NgbModal) { }

    openModal(etapa_id: number) {
        const modalRef = this.modalService.open(AlocarRecursoMaterialFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa_id = etapa_id;
    }

}
