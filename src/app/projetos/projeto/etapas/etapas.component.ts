import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EtapaFormComponent } from '@app/projetos/etapa-form/etapa-form.component';
import { AppService } from '@app/app.service';
import { ProjetosService } from '@app/projetos/projetos.service';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent {

    constructor(
        protected projetoService: ProjetosService,
        protected modalService: NgbModal,
        protected appService: AppService

    ) { }

    openModal(etapa_id: number) {
        const modalRef = this.modalService.open(EtapaFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa_id = etapa_id;
    }

    excluir(id: number) {
        this.appService.confirm(`Tem certeza quer deseja excluir esta etapa?
         Todos os produtos intermediários associados a ela perdrão sua associação.`
            , "Excluir Etapa").then(response => {
                if (response) {
                    this.appService.alert("Etapa Excluída");
                }
            });
    }

}
