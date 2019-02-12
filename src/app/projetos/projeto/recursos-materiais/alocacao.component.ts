import { Component, OnInit } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Projeto, AlocacaoRM } from '@app/models';
import { zip, of } from 'rxjs';
import { AppService } from '@app/app.service';

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
        protected app: AppService,
        protected modalService: NgbModal) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getAlocacaoRM(p.id),
            ))
        );

        data$.subscribe(([projeto, alocacoes]) => {
            this.projeto = projeto;
            this.alocacoes = alocacoes;
        });
    }

    openModal(alocacao: AlocacaoRM | {} = {}) {
        const modalRef = this.modalService.open(AlocarRecursoMaterialFormComponent, { size: 'lg' });
        modalRef.componentInstance.alocacao = alocacao;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();

        }, e => {

        });

    }

}
