import { Component, OnInit } from '@angular/core';

import { ProjetoService } from '@app/projetos/projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '@app/projetos/novo-projeto/novo-projeto.component';
import { Projeto } from '@app/projetos/common';

@Component({
    selector: 'app-meus-projetos',
    templateUrl: './meus-projetos.component.html',
    styleUrls: ['./meus-projetos.component.scss']
})
export class MeusProjetosComponent implements OnInit {

    projetos: Projeto[];
    total_projetos = 0;

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) {
        this.projetos = [];
    }

    openNovoProjeto() {
        const modalRef = this.modalService.open(NovoProjetoComponent, { size: 'lg' });
    }

    getProjetos() {
        this.projetoService.getProjetos().subscribe(projetos => {
            this.projetos = projetos;
            this.total_projetos = this.projetos.length;
        });
    }

    ngOnInit() {
        // Carregar os projetos
        this.getProjetos();
    }

}
