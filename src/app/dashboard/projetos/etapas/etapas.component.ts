import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtapaFormComponent } from '@app/projetos/etapa-form/etapa-form.component';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent implements OnInit {

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }

    openFormEtapa() {
        const modalRef = this.modalService.open(EtapaFormComponent, { size: 'lg' });
    }

    ngOnInit() {
    }

}
