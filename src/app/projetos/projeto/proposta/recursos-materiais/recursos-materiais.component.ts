import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterialFormComponent } from '@app/projetos/recurso-material-form/recurso-material-form.component';
import { Projeto, RecursoMaterial, CategoriasContabeis } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-recursos-materiais',
    templateUrl: './recursos-materiais.component.html',
    styleUrls: ['./recursos-materiais.component.scss']
})
export class RecursosMateriaisComponent implements OnInit {

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    recursosMaterias: Array<any>;
    categoriaContabel = CategoriasContabeis;
    projeto: Projeto;
    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nome',
        direction: 'asc'
    };

    constructor(
        private route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) { }

    ngOnInit() {
        this.loadData();

    }

    loadData() {
        this.loading.show();
        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getRecursoMaterial(p.id),
            ))
        );

        data$.subscribe(([projeto, recursosMaterias]) => {
            this.projeto = projeto;
            this.recursosMaterias = recursosMaterias.map(rec => {
                rec.categoriaContabelNome = this.categoriaContabel.find(e => rec.categoriaContabilValor === e.value).text;
                return rec;
            });
            this.loading.hide();
        });
    }

    openModal(recursoMaterial: RecursoMaterial | {} = {}) {
        const modalRef = this.modalService.open(RecursoMaterialFormComponent, { size: 'lg' });
        modalRef.componentInstance.recursoMaterial = recursoMaterial;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();
        }, e => {

        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }
}
