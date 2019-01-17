import { Input } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/projetos/common';


export abstract class BaseComponent {

    @Input() projeto: Projeto;

    abstract modalComponent: any;

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }

    openModal(...args) {
        const modalRef = this.modalService.open(this.modalComponent, { size: 'lg' });
        this.modalSetup(modalRef, args);
    }
    abstract modalSetup(modalRef: NgbModalRef, ...args): void;



}
