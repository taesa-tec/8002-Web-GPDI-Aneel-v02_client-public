import {Component, OnInit, ViewChild} from '@angular/core';

import {AlocarRecursoHumanoFormComponent} from '@app/dashboard/projeto/common/recursos-humanos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {ProjetosService} from '@app/core/services/projetos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {map, mergeMap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {Projeto, AlocacaoRH, Etapa, Empresa, EmpresaProjeto} from '@app/models';
import {ProjetoFacade, EmpresaFacade, EmpresaProjetoFacade} from '@app/facades/index';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: []
})
export class AlocacaoComponent implements OnInit {

    alocacoes: Array<AlocacaoRH>;
    etapas: Array<Etapa> = [];
    projeto: ProjetoFacade;
    catalogEmpresa: Array<Empresa>;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'recursoHumano.nomeCompleto',
        direction: 'asc'
    };

    constructor(
        protected projetoService: ProjetosService,
        protected route: ActivatedRoute, protected app: AppService,
        protected modalService: NgbModal) {
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    openModal(alocacao: AlocacaoRH | any = {}) {
        const modalRef = this.modalService.open(AlocarRecursoHumanoFormComponent, {size: 'lg'});
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

    async loadData() {
        this.loading.show();
        this.projeto = await this.app.projetos.getCurrent();
        this.catalogEmpresa = await this.app.catalogo.empresas().toPromise();

        const alocacoes = await this.app.projetos.getAlocacaoRH(this.projeto.id).toPromise();
        const etapas = this.projeto.isPD ? await this.app.projetos.getEtapas(this.projeto.id).toPromise() : [];
        const empresas = await this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>().pipe(map(es => {
            return es.map(_e => new EmpresaProjetoFacade(_e));
        })).toPromise();

        if (etapas) {
            this.etapas = etapas.map((etapa, i) => {
                etapa.numeroEtapa = i + 1;
                return etapa;
            });
        }

        this.alocacoes = alocacoes.map(aloc => {

            aloc.currentEtapa = this.projeto.isPD ? this.etapas.find(eta => eta.id === aloc.etapaId) : false;
            aloc.empresa = empresas.find(e => e.id === aloc.empresaId);
            aloc.recursoHumano.empresa = empresas.find(e => e.id === aloc.recursoHumano.empresaId);
            aloc.horasTotal = 0;

            for (let i = 1; i <= (this.projeto.isPD ? 6 : 24); i++) {
                aloc.horasTotal += (aloc['hrsMes' + i] || 0);
            }

            aloc.valorTotal = aloc.horasTotal * aloc.recursoHumano.valorHora;

            aloc.valorTotal = Math.round(aloc.valorTotal * 100) / 100;
            return aloc;
        });

        this.loading.hide();

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
