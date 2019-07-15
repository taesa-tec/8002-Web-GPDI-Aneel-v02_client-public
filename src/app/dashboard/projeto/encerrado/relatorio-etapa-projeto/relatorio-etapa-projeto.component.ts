import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/index';
import {Etapa} from '@app/models';
import {EtapaAtividadesFormComponent} from '../../common/etapa-atividades-form/etapa-atividades-form.component';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import * as moment from 'moment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-relatorio-etapa-projeto',
    templateUrl: './relatorio-etapa-projeto.component.html',
    styleUrls: []
})
export class RelatorioEtapaProjetoComponent implements OnInit {

    projeto: ProjetoFacade;
    etapas: Array<Etapa>;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'id',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, protected modal: NgbModal) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.obterRelatoriosEtapas();
    }

    obterRelatoriosEtapas() {
        this.loading.show();
        this.projeto.REST.Etapas.clearCache();
        this.projeto.REST.Etapas.listar<Array<Etapa>>().subscribe(etapas => {
            this.loading.hide();
            this.etapas = etapas;
        }, err => this.loading.hide());
    }

    editar(etapa: Etapa) {
        const ref = this.modal.open(EtapaAtividadesFormComponent, {size: 'lg'});
        const etapaAtividadeForm = <EtapaAtividadesFormComponent>ref.componentInstance;
        etapaAtividadeForm.setEtapa(etapa);
        ref.result.then(result => {
            if (result) {
                this.obterRelatoriosEtapas();
            }
        }, e => {

        });
    }

    etapaMeses(etapa: Etapa) {
        return etapa.etapaMeses.sort((a, b) => {
            if (a.mes === b.mes) {
                return 0;
            }
            return (moment(a.mes).isBefore(moment(b.mes))) ? -1 : 1;
        }).map(mes => {
            return moment(mes.mes).format('MMM/YYYY');
        }).join(' - ');
    }

}
