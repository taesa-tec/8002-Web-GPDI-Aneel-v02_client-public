import { Component, OnInit } from '@angular/core';
import { ProdutoFormComponent } from '@app/projetos/projeto/common/produto-form/produto-form.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { map } from 'rxjs/operators';
import { Projeto, Produto, Etapa } from '@app/models';
import { zip } from 'rxjs';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

    produtos: Array<Produto>;
    projeto: Projeto;
    etapas: { [propName: number]: Etapa } = {};

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'titulo',
        direction: 'asc'
    };

    constructor(
        private app: AppService,
        private route: ActivatedRoute
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

        const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));

        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.loadProdutos();
        });
    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

    loadProdutos() {
        const produtos$ = this.app.projetos.getProdutos(this.projeto.id);
        const etapas$ = this.app.projetos.getEtapas(this.projeto.id);
        zip(produtos$, etapas$).subscribe(([produtos, etapas]) => {
            this.produtos = produtos || [];
            etapas.forEach((etapa, index) => {
                this.etapas[etapa.id] = Object.assign(etapa, { numeroEtapa: index + 1 });
            });
        });
    }
}
