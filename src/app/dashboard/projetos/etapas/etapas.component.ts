import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EtapaFormComponent } from '@app/projetos/etapa-form/etapa-form.component';
import { UiService } from '@app/shared/ui.service';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent {

    constructor(
        protected projetoService: ProjetoService,
        protected modalService: NgbModal,
        protected UI: UiService

    ) { }

    openModal(etapa_id: number) {
        const modalRef = this.modalService.open(EtapaFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa_id = etapa_id;
    }

    excluir(id: number) {
        this.UI.confirm(`Tem certeza quer deseja excluir esta etapa?
         Todos os produtos intermediários associados a ela perdrão sua associação.`
            , "Excluir Etapa").then(response => {
                if (response) {
                    this.UI.alert("Etapa Excluída");
                }
            });
    }

}
