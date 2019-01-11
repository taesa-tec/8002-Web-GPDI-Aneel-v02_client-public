import { Component, OnInit } from '@angular/core';

import { ProjetoService } from '../projeto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '../novo-projeto/novo-projeto.component';
import { Projeto } from 'src/app/shared/projeto.model';

@Component({
    selector: 'app-meus-projetos',
    templateUrl: './meus-projetos.component.html',
    styleUrls: ['./meus-projetos.component.scss']
})
export class MeusProjetosComponent implements OnInit {

    projetos: Projeto[];

    constructor(protected projetoService: ProjetoService, protected modalService: NgbModal) {
        this.projetos = [];
    }

    openNovoProjeto() {
        const modalRef = this.modalService.open(NovoProjetoComponent, { size: 'lg' });
    }

    getProjetos() {
        this.projetoService.getProjetos().subscribe(projetos => {
            this.projetos = projetos;
        });
    }

    ngOnInit() {
        // Carregar os projetos
        this.getProjetos();
    }

}
