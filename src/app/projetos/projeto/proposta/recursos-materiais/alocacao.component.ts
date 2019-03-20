import { Component, OnInit, ViewChild } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/projeto/common/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Projeto, AlocacaoRM, CategoriasContabeis, EmpresaProjeto } from '@app/models';
import { zip, of } from 'rxjs';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { EmpresaProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent implements OnInit {

    categoriaContabel = CategoriasContabeis;
    alocacoes: Array<any>;
    projeto: Projeto;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'recursoMaterial.nome',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        private route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {

        this.loading.show();

        const data$ = this.app.projetos.projetoLoaded.pipe(
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getAlocacaoRM(p.id),
                p.REST.Empresas.listar<Array<EmpresaProjeto>>()
                    .pipe(map(empresas => empresas.map(e => new EmpresaProjetoFacade(e))))
            ))
        );

        data$.subscribe(([projeto, alocacoes, empresas]) => {


            this.projeto = projeto;

            this.alocacoes = alocacoes.map(aloc => {

                if (aloc.empresaFinanciadoraId) {
                    const empresa = empresas.find(e => aloc.empresaFinanciadoraId === e.id);
                    console.log({ empresa });

                    aloc.empresaFinanciadoraNome = empresa ? empresa.nome : "Não encontrada";

                }

                if (aloc.recursoMaterial) {
                    aloc.categoriaContabelNome = this.categoriaContabel.find(e => aloc.recursoMaterial.categoriaContabilValor === e.value).text;
                }

                aloc.valorTotal = aloc.qtd * aloc.recursoMaterial.valorUnitario;

                return aloc;
            });
            this.loading.hide();
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

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
