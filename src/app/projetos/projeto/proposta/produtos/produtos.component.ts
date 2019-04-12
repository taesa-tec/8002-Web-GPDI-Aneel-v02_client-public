import { Component, OnInit } from '@angular/core';
import { ProdutoFormComponent } from '@app/projetos/projeto/common/produto-form/produto-form.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { map } from 'rxjs/operators';
import { Projeto, Produto, Etapa } from '@app/models';
import { zip } from 'rxjs';
import { ProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: []
})
export class ProdutosComponent implements OnInit {

    produtos: Array<Produto>;
    projeto: ProjetoFacade;
    etapas: { [propName: number]: Etapa } = {};

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'titulo',
        direction: 'asc'
    };

    constructor(
        protected app: AppService,
        protected route: ActivatedRoute
    ) {
    }


    openModal(produto: Produto | {} = {}) {
        const modalRef = this.app.modal.open(ProdutoFormComponent, { size: 'lg' });
        modalRef.componentInstance.produto = produto;
        modalRef.componentInstance.projeto = this.projeto;
        modalRef.result.then(result => {
            this.loadProdutos();
        }, e => {

        });

    }

    ngOnInit() {

        const projeto$ = this.app.projetos.projetoLoaded;

        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.loadProdutos();
        });
    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

    async loadProdutos() {

        const produtos$ = this.projeto.REST.Produtos.listar<Array<Produto>>();
        const etapas$ = this.projeto.REST.Etapas.listar<Array<Etapa>>();

        zip(produtos$, etapas$).subscribe(([produtos, etapas]) => {
            this.produtos = produtos || [];
            if (etapas) {
                etapas.forEach((etapa, index) => {
                    this.etapas[etapa.id] = Object.assign(etapa, { numeroEtapa: index + 1 });
                });
            }
        });
    }
}
