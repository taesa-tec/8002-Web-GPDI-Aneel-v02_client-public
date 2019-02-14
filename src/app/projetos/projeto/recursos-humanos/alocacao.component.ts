import { Component, OnInit, ViewChild } from '@angular/core';

import { AlocarRecursoHumanoFormComponent } from '@app/projetos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto } from '@app/models';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent implements OnInit {

    alocacoes: Array<any>;
    projeto: Projeto;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nomeCompleto',
        direction: 'asc'
    };

    constructor(
        protected projetoService: ProjetosService,
        protected route: ActivatedRoute, protected app: AppService,
        protected modalService: NgbModal) { }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    openModal(etapa_id: number = 0) {
        const modalRef = this.modalService.open(AlocarRecursoHumanoFormComponent, { size: 'lg' });
        // modalRef.componentInstance.etapa_id = etapa_id;
        modalRef.componentInstance.projeto = this.projeto;
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading.show();

        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getAlocacaoRH(p.id),
            ))
        );

        data$.subscribe(([projeto, alocacoes]) => {
            this.projeto = projeto;
            this.alocacoes = alocacoes;

            console.log(alocacoes);


            this.loading.hide();
        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
