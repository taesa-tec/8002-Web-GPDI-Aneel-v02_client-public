import { Component, OnInit } from '@angular/core';

import { AlocarRecursoHumanoFormComponent } from '@app/projetos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent {

    constructor(protected projetoService: ProjetosService, protected modalService: NgbModal) { }

    openModal(etapa_id: number = 0) {
        const modalRef = this.modalService.open(AlocarRecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa_id = etapa_id;
    }

}
