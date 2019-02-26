import { Component, OnInit, ViewChild } from '@angular/core';
import { RecursoHumanoFormComponent } from '@app/projetos/projeto/common/recurso-humano-form/recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from '@app/app.service';
import { zip, of } from 'rxjs';
import { Projeto, RecursoHumano, Funcao, Titulacao } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-recursos-humanos',
    templateUrl: './recursos-humanos.component.html',
    styles: []
})
export class RecursosHumanosComponent implements OnInit {

    recursosHumano: Array<any>;
    funcoes = Funcao;
    titualcoes = Titulacao;
    projeto: Projeto;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nomeCompleto',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        protected projetoService: ProjetosService,
        protected route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) { }

    openModal(recurso_humano: RecursoHumano | any = {}) {
        const modalRef = this.modalService.open(RecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.recursoHumano = recurso_humano;
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
        this.loading.show();
        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getRH(p.id),
                this.app.catalogo.empresas(),
                this.app.projetos.getEmpresas(p.id)
            ))
        );

        data$.subscribe(([projeto, recurso_humano, catalog_empresas, empresas]) => {
            this.projeto = projeto;

            this.recursosHumano = recurso_humano.map(_rec => {

                let rec = Object.assign({}, _rec);

                rec.funcaoNome = this.funcoes.find(e => rec.funcaoValor === e.value).text;
                rec.titulacaoNome = this.titualcoes.find(e => rec.titulacaoValor === e.value).text;

                rec.catalogEmpresaId = empresas.find(e => rec.empresaId === e.id).catalogEmpresaId;

                // rec.EmpresaNome = empresas.razaoSocial ? empresas.razaoSocial : '';

                if (rec.catalogEmpresaId) {
                    rec.catalogEmpresa = catalog_empresas.find(e => rec.catalogEmpresaId === e.id);
                    rec.EmpresaNome = rec.catalogEmpresa.nome;
                }

                return rec;
            });
            this.loading.hide();
        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
