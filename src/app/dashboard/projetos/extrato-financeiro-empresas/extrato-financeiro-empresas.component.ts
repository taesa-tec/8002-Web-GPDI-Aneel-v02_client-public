import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UiService } from '@app/shared/ui.service';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';

@Component({
    selector: 'app-extrato-financeiro-empresas',
    templateUrl: './extrato-financeiro-empresas.component.html',
    styleUrls: ['./extrato-financeiro-empresas.component.scss']
})
export class ExtratoFinanceiroEmpresasComponent implements OnInit {

    constructor(
        protected projetoService: ProjetoService,
        protected modalService: NgbModal,
        protected UI: UiService

    ) { }

    openModal(id: number) {
        const modalRef = this.modalService.open(RecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.recurso_id = id;
    }

    ngOnInit() {
    }

}
