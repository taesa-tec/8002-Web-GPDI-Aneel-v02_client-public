import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/core/services/app.service';
import {Projeto, Etapa, EmpresaProjeto, RecursoHumano, AlocacaoRH} from '@app/models';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {zip} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {EmpresaProjetoFacade, ProjetoFacade} from '@app/facades/index';
import * as moment from 'moment';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-alocar-recurso-humano-form',
    templateUrl: './alocar-recurso-humano-form.component.html',
    styles: []
})
export class AlocarRecursoHumanoFormComponent implements OnInit {

    projeto: ProjetoFacade;
    recursosHumanos: Array<RecursoHumano>;
    etapas: Array<Etapa>;
    // empresasFinanciadoras: Array<EmpresaProjetoFacade>;
    empresas: Array<EmpresaProjetoFacade>;
    form: FormGroup;
    horasAlocadas: Array<any> = [];
    etapaMarcada = false;
    alocacao: AlocacaoRH;
    maxHora = 160;
    totalMeses: number;
    mesInicial: moment.Moment = moment();

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) {
    }

    get modalTitle() {
        return typeof this.alocacao.id !== 'undefined' ? 'Editar Alocação Recurso Humano' : 'Alocar Recurso Humano';
    }

    get buttonAction() {
        return typeof this.alocacao.id !== 'undefined' ? {text: 'Salvar Alterações', icon: 'ta-save'} :
            {text: 'Alocar Recurso Humano', icon: 'ta-plus-circle'};
    }

    get empresasFinanciadoras() {
        if (this.recursoHumano) {
            return this.empresas.filter(item => {
                if (this.recursoHumano.empresa !== undefined && this.recursoHumano.empresa.classificacaoValor !== 'Executora') {
                    return this.recursoHumano.empresa.id === item.id;
                }
                return item.classificacaoValor !== 'Executora';
            });
        }
        return [];
    }

    get recursoHumano() {
        const recursoHumano = this.form.get('recursoHumanoId');
        return recursoHumano ? this.recursosHumanos.find(r => r.id === parseInt(recursoHumano.value, 10)) : null;
    }

    ngOnInit() {
        this.loadData();
    }

    setup() {
        this.totalMeses = this.projeto.isPG ? 24 : 6;
        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoHumanoId: new FormControl(this.alocacao.recursoHumanoId || '', Validators.required),
            empresaId: new FormControl(this.alocacao.empresaId || '', Validators.required),
            justificativa: new FormControl(this.alocacao.justificativa || '', Validators.required),
        });

        if (this.alocacao.id !== undefined) {
            this.form.addControl('id', new FormControl(this.alocacao.id));
        }

        this.configForm();
        this.addHorasMesForm();

        if (this.projeto.isPD) {
            const etapaId = new FormControl(this.alocacao.etapaId || '', Validators.required);

            etapaId.valueChanges.subscribe(value => {
                const etapa$ = this.etapas.find(e => e.id === parseInt(value, 10));
                this.mesInicial = moment(etapa$.dataInicio);
            });

            this.form.addControl('etapaId', etapaId);
        } else {
            this.mesInicial = moment(this.projeto.dataInicio);
        }

        this.form.updateValueAndValidity();
    }

    configForm() {
        this.form.get('recursoHumanoId').valueChanges.subscribe(value => {

            this.form.get('empresaId').setValue('');

            if (value !== '') {

                const rh = this.recursosHumanos.find(e => e.id === parseInt(value, 10));

                const empresa = this.empresas.find(e => e.id === rh.empresaId);

                if (empresa.classificacaoValor !== undefined && (empresa.classificacaoValor === 'Proponente' || empresa.classificacaoValor === 'Energia')) {
                    this.maxHora = 172;
                }
            }
        });
    }

    loadData() {
        this.loading.show();
        const recursosHumanos$ = this.projeto.relations.recursosHumanos.get();
        const etapas$ = this.projeto.relations.etapas.get(); // this.app.projetos.getEtapas(this.projeto.id);
        const empresas$ = this.projeto.relations.empresas.get();

        zip(recursosHumanos$, etapas$, empresas$).subscribe(([recursosHumanos, etapas, empresas]) => {

            if (etapas) {
                this.etapas = etapas.map((etapa, i) => {
                    etapa.numeroEtapa = i + 1;
                    return etapa;
                });
            }
            this.recursosHumanos = recursosHumanos;
            this.empresas = empresas;
            this.loading.hide();
            this.setup();
        });
    }

    addHorasMesForm() {
        for (let i = 1; i <= this.totalMeses; i++) {
            const value = this.alocacao[`hrsMes${i}`] || '';
            this.form.addControl(`hrsMes${i}`, new FormControl(value, [Validators.required, (control) => {
                return parseFloat(control.value) > this.maxHora ? {max: true} : null;
            }]));
        }
    }

    getMesAnoAt(i) {
        if (this.mesInicial) {
            return this.mesInicial.clone().add(i - 1, 'months').format('MMM YYYY');
        }
        return `Mês ${i}`;
    }

    submit() {
        if (this.form.valid) {
            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRH(this.form.value) : this.app.projetos.criarAlocacaoRH(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.activeModal.close(result);
                    if (this.form.get('id')) {
                        this.logger.saveUpdate();
                    } else {
                        this.logger.saveCreate();
                    }
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }

    excluir() {
        this.app.confirm('Tem certeza que deseja excluir esta alocação do recurso humano?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delAlocacaoRH(this.alocacao.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            this.activeModal.close('deleted');
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.loading.hide();
                        this.app.alert(error.message);
                    });
                }

            });
    }

}
