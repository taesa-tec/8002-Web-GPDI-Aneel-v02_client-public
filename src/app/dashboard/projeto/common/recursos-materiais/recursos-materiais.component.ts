import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RecursoMaterialFormComponent} from '@app/dashboard/projeto/common/recursos-materiais/recurso-material-form/recurso-material-form.component';
import {Projeto, RecursoMaterial, CategoriasContabeis} from '@app/models';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {ProjetoFacade} from '@app/facades/projeto.facade';

@Component({
    selector: 'app-recursos-materiais',
    templateUrl: './recursos-materiais.component.html',
    styles: []
})
export class RecursosMateriaisComponent implements OnInit {

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    recursosMaterias: Array<any>;
    categoriaContabel = CategoriasContabeis;
    projeto: ProjetoFacade;
    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nome',
        direction: 'asc'
    };

    constructor(
        private route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.loadData();

    }

    async loadData(clearCache = false) {
        this.loading.show();

        if (clearCache) {
            this.projeto.REST.RecursoMateriais.clearCache();
        }

        const recursosMaterias = await this.projeto.REST.RecursoMateriais.listar<Array<any>>().toPromise();

        this.recursosMaterias = recursosMaterias.map(rec => {
            try {
                if (rec.categoriaContabilGestao) {
                    rec.categoriaContabelNome = rec.categoriaContabilGestao.nome;
                } else {
                    rec.categoriaContabelNome = this.categoriaContabel.find(e => rec.categoriaContabilValor === e.value).text;
                }
            } catch (err) {
                rec.categoriaContabelNome = 'Não encontrada';
            }
            return rec;
        });
        this.loading.hide();
    }

    openModal(recursoMaterial: RecursoMaterial | {} = {}) {
        const modalRef = this.modalService.open(RecursoMaterialFormComponent, {size: 'lg'});
        modalRef.componentInstance.recursoMaterial = recursoMaterial;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData(true);
        }, e => {

        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }
}
