import { Component, OnInit } from '@angular/core';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from '@app/app.service';
import { zip, of } from 'rxjs';
import { Projeto } from '@app/models';

@Component({
    selector: 'app-recursos-humanos',
    templateUrl: './recursos-humanos.component.html',
    styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent implements OnInit {

    recursosHumano: Array<any>;
    projeto: Projeto;

    constructor(
        protected projetoService: ProjetosService,
        protected route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) { }

    openModal(recurso_id: number = 0) {
        const modalRef = this.modalService.open(RecursoHumanoFormComponent, { size: 'lg' });
        // modalRef.componentInstance.recurso_id = recurso_id;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();
        }, e => {

        });
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {

        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getRH(p.id)
            ))
        );

        data$.subscribe(([projeto, recurso_humano]) => {
            this.projeto = projeto;
            this.recursosHumano = recurso_humano;
        });

    }

}
