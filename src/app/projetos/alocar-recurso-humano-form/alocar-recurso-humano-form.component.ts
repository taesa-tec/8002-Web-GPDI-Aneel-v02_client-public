import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { AppService } from '@app/app.service';
import { Projeto, Etapa, EmpresaProjeto, RecursoHumano, AlocacaoRH } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { zip } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-alocar-recurso-humano-form',
    templateUrl: './alocar-recurso-humano-form.component.html',
    styleUrls: ['./alocar-recurso-humano-form.component.scss']
})
export class AlocarRecursoHumanoFormComponent implements OnInit {

    projeto: Projeto;
    recursosHumano: RecursoHumano;
    etapas: Array<Etapa>;
    empresasFinanciadora: EmpresaProjeto;
    form: FormGroup;
    horasAlocadas: Array<any> = [];
    etapaMarcada = false;
    alocacao: AlocacaoRH;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) { }

    get modalTitle() {
        return typeof this.alocacao.id !== 'undefined' ? "Editar Alocamento Recurso Humano" : "Alocar Recurso Humano";
    }

    get buttonAction() {
        return typeof this.alocacao.id !== 'undefined' ? { text: "Salvar Alterações", icon: 'ta-save' } :
            { text: "Alocar Recurso Humano", icon: 'ta-plus-circle' };
    }

    ngOnInit() {
        this.setup();
        this.loadData();
    }

    _horaAlocadas(duracao: number = 6, etapa?: Etapa) {

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        this.horasAlocadas = [];

        for (let i = 1; i <= duracao; i++) {

            let horas = { text: "Mês " + i, name: "hrsMes" + i, form: new FormControl({ value: '', disabled: true }, Validators.required) };

            if (etapa && etapa.dataInicio) {

                const dataInicio = new Date(etapa.dataInicio);
                dataInicio.setMonth(dataInicio.getMonth() + (i - 1));
                horas = { text: monthNames[dataInicio.getMonth()], name: "hrsMes" + i, form: new FormControl('', Validators.required) };

            } else if (this.alocacao.id !== undefined && this.etapas !== undefined) {

                const etapaVal = this.etapas.find(e => e.id === this.alocacao.etapaId);
                const dataInicio = new Date(etapaVal.dataInicio);
                dataInicio.setMonth(dataInicio.getMonth() + (i - 1));
                horas = { text: monthNames[dataInicio.getMonth()], name: "hrsMes" + i, form: new FormControl(this.alocacao["hrsMes" + i] || '', Validators.required) };

            }

            this.horasAlocadas.push(horas);
        }
    }

    _form_horaAlocadas() {

        this.horasAlocadas.forEach((value) => {
            this.form.removeControl(value.name);
            this.form.addControl(value.name, value.form);

        });
    }

    setup() {

        const etapa = new FormControl(this.alocacao.etapaId || '', Validators.required);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoHumanoId: new FormControl(this.alocacao.recursoHumanoId || '', Validators.required),
            etapaId: etapa,
            empresaId: new FormControl(this.alocacao.empresaId || '', Validators.required),
            justificativa: new FormControl(this.alocacao.justificativa || '', Validators.required),
            //valorHora: new FormControl('',Validators.required),
            //hrsMes1: new FormControl('',Validators.required), esta na funções horasAlocadas()
        });

        this._horaAlocadas();
        this._form_horaAlocadas();

        etapa.valueChanges.subscribe(value => {

            this.etapaMarcada = true;

            const etapaVal = this.etapas.find(e => e.id === parseInt(value, 10));

            this._horaAlocadas(6, etapaVal);

            this._form_horaAlocadas();

        });

        if (this.alocacao.id !== undefined) {
            this.form.addControl('id', new FormControl(this.alocacao.id));
        }
    }

    loadData() {
        this.loading.show();
        const rh$ = this.app.projetos.getRH(this.projeto.id);
        const etapas$ = this.app.projetos.getEtapas(this.projeto.id);
        const empresas$ = this.app.projetos.getEmpresas(this.projeto.id);

        zip(rh$, etapas$, empresas$).subscribe(([rh, etapas, empresas]) => {

            this.recursosHumano = rh;
            this.etapas = etapas.map((etapa, i) => { etapa.numeroEtapa = i + 1; return etapa; });
            this.empresasFinanciadora = empresas.filter(item => item.classificacaoValor !== "Executora");
            this._horaAlocadas();
            this._form_horaAlocadas();
            this.loading.hide();
        });
    }

    submit() {
        if (this.form.valid) {
            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRH(this.form.value) : this.app.projetos.criarAlocacaoRH(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                console.log(result);

                if (result.sucesso) {
                    this.activeModal.close(result);
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }

    excluir() {
        this.app.confirm("Tem certeza que deseja excluir este alocamento do recurso humano?", "Confirmar Exclusão")
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
