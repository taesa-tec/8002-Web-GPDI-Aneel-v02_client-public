import { Component, OnInit, ViewChild } from '@angular/core';

import { AlocarRecursoHumanoFormComponent } from '@app/projetos/projeto/common/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto, AlocacaoRH, Etapa, Empresa } from '@app/models';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent implements OnInit {

    alocacoes: Array<any>;
    etapas: Array<Etapa>;
    projeto: Projeto;
    catalogEmpresa: Array<Empresa>;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'recursoHumano.nomeCompleto',
        direction: 'asc'
    };

    constructor(
        protected projetoService: ProjetosService,
        protected route: ActivatedRoute, protected app: AppService,
        protected modalService: NgbModal) { }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    openModal(alocacao: AlocacaoRH | any = {}) {
        const modalRef = this.modalService.open(AlocarRecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.alocacao = alocacao;
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
                this.app.projetos.getAlocacaoRH(p.id),
                this.app.projetos.getEtapas(p.id),
                this.app.catalogo.empresas(),
            ))
        );

        data$.subscribe(([projeto, alocacoes, etapas, catalog_empresa]) => {
            this.projeto = projeto;

            this.catalogEmpresa = catalog_empresa;

            this.etapas = etapas.map((etapa, i) => { etapa.numeroEtapa = i + 1; return etapa; });

            this.alocacoes = alocacoes.map(aloc => {

                aloc.currentEtapa = this.etapas.find(eta => eta.id === aloc.etapaId);

                aloc.Empresa = aloc.empresa.razaoSocial ? aloc.empresa.razaoSocial : '';

                if (aloc.empresa.catalogEmpresaId) {
                    aloc.catalogEmpresa = catalog_empresa.find(e => aloc.empresa.catalogEmpresaId === e.id);
                    aloc.Empresa = aloc.catalogEmpresa.nome;
                }

                aloc.horasTotal = 0;

                for (let i = 1; i <= 6; i++) {
                    aloc.horasTotal += aloc["hrsMes" + i];
                }

                aloc.valorTotal = aloc.horasTotal * aloc.recursoHumano.valorHora;

                aloc.valorTotal = Math.round(aloc.valorTotal * 100) / 100;

                return aloc;
            });

            this.loading.hide();
        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
