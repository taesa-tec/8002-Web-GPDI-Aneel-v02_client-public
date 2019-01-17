import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaFormComponent } from '@app/projetos/empresa-form/empresa-form.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent extends BaseComponent implements OnInit {

    modalComponent = EmpresaFormComponent;

    constructor(projetoService: ProjetoService, modalService: NgbModal) {
        super(projetoService, modalService);
    }
    openFormEmpresa(empresaId = null) {
        const modalRef = this.modalService.open(EmpresaFormComponent, { size: 'lg' });

        if (empresaId) {
            // modalRef.componentInstance.empresaId = produtoId;
        }
    }
    modalSetup(modalRef: NgbModalRef, args) {
        if (args.length > 0) {
            const empresaId = args[0];
            // modalRef.componentInstance.empresaId = produtoId;
        }
    }

    ngOnInit() {
    }

}
