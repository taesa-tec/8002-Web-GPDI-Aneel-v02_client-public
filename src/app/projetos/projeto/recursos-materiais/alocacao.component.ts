import { Component, OnInit } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Projeto } from '@app/models';
import { zip } from 'rxjs';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent implements OnInit {

    alocacoes: Array<any>;
    projeto: Projeto;

    constructor(
        private route: ActivatedRoute,
        protected projetoService: ProjetosService,
        protected modalService: NgbModal) { }

    ngOnInit() {
        const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));
        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.loadAlocacao();
        });
    }

    loadAlocacao() {
        this.projetoService.getAlocacaoRM(this.projeto.id).subscribe(alocacoes => this.alocacoes = alocacoes || []);
    }

    openModal(etapa_id: number) {
        const modalRef = this.modalService.open(AlocarRecursoMaterialFormComponent, { size: 'lg' });
        //modalRef.componentInstance.etapa_id = etapa_id;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadAlocacao();

        }, e => {

        });

    }

}
