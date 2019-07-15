import {Component, OnInit, ViewChild} from '@angular/core';
import {EtapaFormComponent} from '@app/dashboard/projeto/common/etapa-form/etapa-form.component';
import {AppService} from '@app/core/services/app.service';
import {zip} from 'rxjs';
import {Projeto, Etapa} from '@app/models';
import {FormGroup, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {ProjetoFacade} from '@app/facades/index';
import * as moment from 'moment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styles: []
})
export class EtapasComponent implements OnInit {

    projeto: ProjetoFacade;
    etapas: Array<Etapa> = [];
    form: FormGroup;
    dataInicio = new Date();

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'id',
        direction: 'asc'
    };

    @ViewChild('loading') loading: LoadingComponent;

    get ano() {
        return this.dataInicio.getFullYear();
    }

    set ano(value) {
        this.dataInicio.setFullYear(value);
        this.setControlData();
    }

    get mes() {
        return this.dataInicio.getMonth();
    }

    set mes(value) {
        this.dataInicio.setMonth(value);
        this.setControlData();
    }

    constructor(private app: AppService, protected modal: NgbModal) {
    }

    protected setControlData() {
        const d = new Date(this.ano, this.mes, 1);
        const v = (new DatePipe('en-US')).transform(d, 'yyyy-MM-dd');
        this.form.get('dataInicio').setValue(v);
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

    ngOnInit() {
        this.setup();
    }

    async setup() {
        this.projeto = await this.app.projetos.getCurrent();

        const dataInicio = this.projeto.dataInicio ? moment(this.projeto.dataInicio) : moment();

        this.form = new FormGroup({
            id: new FormControl(this.projeto.id),
            dataInicio: new FormControl('')
        });

        this.mes = parseFloat(dataInicio.format('MM')) - 1;
        this.ano = parseFloat(dataInicio.format('YYYY'));
        await this.loadEtapas();

    }


    async loadEtapas(clearCache = false) {
        if (clearCache) {
            this.projeto.REST.Etapas.clearCache();
        }
        this.etapas = [];
        const etapas = await this.projeto.REST.Etapas.listar<Array<Etapa>>().toPromise();

        if (etapas) {
            this.etapas = etapas.map((etapa, i) => {
                etapa.numeroEtapa = i + 1;
                return etapa;
            });
        }
    }

    openModal(etapa: any = {}) {
        const modalRef = this.modal.open(EtapaFormComponent, {size: 'lg'});
        modalRef.componentInstance.etapa = etapa;
        modalRef.componentInstance.projeto = this.projeto;
        modalRef.result.then(r => {
            this.loadEtapas(true);
        }, e => {

        });
    }

    excluir(id: number) {
        this.app.confirm(`Tem certeza quer deseja excluir esta etapa?
         Todos os produtos intermediários associados a ela perdrão sua associação.`
            , 'Excluir Etapa').then(response => {
            if (response) {
                this.app.alert('Etapa Excluída');
            }
        });
    }

    async setDataInicio() {
        this.loading.show();
        // this.app.projetos.editarDataInicio(this.form.value)
        const result = await this.projeto.editarDataInicio(this.form.get('dataInicio').value).toPromise();

        if (result.sucesso) {
            this.app.alert('Salvo com sucesso');
        }

        await this.loadEtapas();

        this.loading.hide();
    }

}
