import {Component, OnInit, ViewChild} from '@angular/core';
import {RecursoHumanoFormComponent} from '@app/projetos/projeto/common/recurso-humano-form/recurso-humano-form.component';
import {ProjetosService} from '@app/projetos/projetos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {AppService} from '@app/app.service';
import {zip, of} from 'rxjs';
import {Projeto, RecursoHumano, Funcoes, Graduacoes} from '@app/models';
import {LoadingComponent} from '@app/shared/loading/loading.component';
import {ProjetoFacade} from '@app/facades';
import {ScreenName} from '@app/decorators';

@ScreenName({name: 'RECURSOS HUMANOS'})
@Component({
    selector: 'app-recursos-humanos',
    templateUrl: './recursos-humanos.component.html',
    styles: []
})
export class RecursosHumanosComponent implements OnInit {

    recursosHumano: Array<RecursoHumano>;
    projeto: ProjetoFacade;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nomeCompleto',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) {
    }

    openModal(recurso_humano: RecursoHumano | any = {}) {
        const modalRef = this.app.modal.open(RecursoHumanoFormComponent, {size: 'lg'});
        modalRef.componentInstance.recursoHumano = recurso_humano;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();
        }, e => {
            //
        });
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading.show();
        const data$ = this.app.projetos.projetoLoaded.pipe(
            mergeMap(p => zip(
                of(p),
                p.relations.recursosHumanos.get(),
                p.relations.empresas.get(),
                this.app.catalogo.empresas(),
            ))
        );

        data$.subscribe(([projeto, recursos_humanos, empresas, catalog_empresas]) => {
            this.projeto = projeto;
            this.recursosHumano = recursos_humanos.map(rec => {
                rec.funcaoNome = Funcoes.find(e => rec.funcaoValor === e.value).text;
                rec.titulacaoNome = Graduacoes.find(e => rec.titulacaoValor === e.value).text;
                return rec;
            });
            this.loading.hide();
        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
