import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaFormComponent } from '@app/projetos/empresa-form/empresa-form.component';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) { }
    openFormEmpresa(empresaId = null) {
        const modalRef = this.modalService.open(EmpresaFormComponent, { size: 'lg' });

        if (empresaId) {
            // modalRef.componentInstance.produto_id = produtoId;
        }
    }

    ngOnInit() {
    }

}
