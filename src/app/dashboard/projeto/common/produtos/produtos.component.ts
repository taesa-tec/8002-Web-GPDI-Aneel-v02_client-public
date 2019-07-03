import {Component, OnInit} from '@angular/core';
import {ProdutoFormComponent} from '@app/dashboard/projeto/common/produtos/produto-form/produto-form.component';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/core/services/app.service';
import {map} from 'rxjs/operators';
import {Projeto, Produto, Etapa} from '@app/models';
import {zip} from 'rxjs';
import {ProjetoFacade} from '@app/facades/index';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
        protected route: ActivatedRoute,
        protected modal: NgbModal,
    ) {
    }


    async openModal(produto: Produto | {} = {}) {
        try {
            const modalRef = this.modal.open(ProdutoFormComponent, {size: 'lg'});
            modalRef.componentInstance.produto = produto;
            modalRef.componentInstance.projeto = this.projeto;
            modalRef.result.then((r) => {
                this.loadProdutos(true).then(() => {
                    console.log('Enviado');
                });
            }, e => {
            });

        } catch (e) {
            console.log(e);
        }
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        await this.loadProdutos();
    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

    async loadProdutos(clearCache = false) {
        if (clearCache) {
            this.projeto.REST.Produtos.clearCache();
        }
        this.produtos = await this.projeto.REST.Produtos.listar<Array<Produto>>().toPromise();

        const etapas = await this.projeto.REST.Etapas.listar<Array<Etapa>>().toPromise();


        if (etapas) {
            etapas.forEach((etapa, index) => {
                this.etapas[etapa.id] = Object.assign(etapa, {numeroEtapa: index + 1});
            });
        }
    }
}
