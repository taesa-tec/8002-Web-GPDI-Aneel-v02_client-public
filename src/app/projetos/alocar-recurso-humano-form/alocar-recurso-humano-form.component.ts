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
    recursosHumano: Array<RecursoHumano>;
    etapas: Array<Etapa>;
    empresasFinanciadora: Array<EmpresaProjeto>;
    empresas: Array<EmpresaProjeto>;
    form: FormGroup;
    horasAlocadas: Array<any> = [];
    etapaMarcada = false;
    alocacao: AlocacaoRH;
    maxHora = 160;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) { }

    get modalTitle() {
        return typeof this.alocacao.id !== 'undefined' ? "Editar Alocação Recurso Humano" : "Alocar Recurso Humano";
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

            let horas = { text: "Mês " + i, name: "hrsMes" + i, form: new FormControl({ value: '', disabled: true }, [Validators.required]) };

            if (etapa && etapa.dataInicio || this.alocacao.id !== undefined) {

                let dataInicio = new Date();
                let val = '';

                if (this.alocacao.id !== undefined) {

                    dataInicio = new Date(this.alocacao.etapa.dataInicio);
                    val = this.alocacao["hrsMes" + i];

                    const empresa = this.alocacao.empresa;

                    if (empresa.classificacaoValor !== undefined && (empresa.classificacaoValor === 'Proponente' || empresa.classificacaoValor === 'Energia')) {
                        this.maxHora = 172;
                    }

                }

                if (etapa && etapa.dataInicio) {
                    dataInicio = new Date(etapa.dataInicio);
                    val = '';
                }

                dataInicio.setMonth(dataInicio.getMonth() + (i - 1));

                horas = {
                    text: monthNames[dataInicio.getMonth()],
                    name: "hrsMes" + i,
                    form: new FormControl(val, [Validators.required, Validators.max(this.maxHora), Validators.min(1)])
                };

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
        const recursoHumano = new FormControl(this.alocacao.recursoHumanoId || '', Validators.required);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoHumanoId: recursoHumano,
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

        recursoHumano.valueChanges.subscribe(value => {

            const rh = this.recursosHumano.find(e => e.id === parseInt(value, 10));

            const empresa = this.empresas.find(e => e.id === rh.empresaId);

            if (empresa.classificacaoValor !== undefined && (empresa.classificacaoValor === 'Proponente' || empresa.classificacaoValor === 'Energia')) {
                this.maxHora = 172;
            }

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
            this.empresas = empresas;
            this.empresasFinanciadora = empresas.filter(item => item.classificacaoValor !== "Executora");
            this.loading.hide();
        });
    }

    logProjeto(tela: string, acao?: string) {

        const logProjeto = {
            userId: this.app.users.currentUser.id,
            projetoId: this.projeto.id,
            tela,
            acao: acao || "Create",
            statusAnterior: "",
            statusNovo: ""
        };

        let horas_string = "";

        const rh = this.recursosHumano.find(e => e.id === parseInt(this.form.get("recursoHumanoId").value, 10));
        const empresa = this.empresas.find(e => e.id === parseInt(this.form.get("empresaId").value, 10));
        const etapa = this.etapas.find(e => e.id === parseInt(this.form.get("etapaId").value, 10));
        const justificativa = this.form.get("justificativa").value;

        this.horasAlocadas.forEach(horas => {
            horas_string += horas.form.value + "h ";
        });

        logProjeto.statusNovo = `<b>Recurso Humano:</b> ${rh.nomeCompleto}<br>
        <b>Etapa Número:</b> ${etapa.numeroEtapa}<br>
        <b>Empresa Financiadora:</b> ${empresa.catalogEmpresa ? empresa.catalogEmpresa.nome : empresa.razaoSocial}<br>
        <b>Horas:</b> ${horas_string}<br>
        <b>Justificativa do Recurso:</b> ${justificativa}<br>`;

        if (acao === "Delete") {
            logProjeto.statusNovo = "";
        }

        if (this.alocacao.id !== undefined) {

            const _rh = this.recursosHumano.find(e => e.id === this.alocacao.recursoHumanoId);
            const _empresa = this.empresas.find(e => e.id === this.alocacao.empresaId);
            const _etapa = this.etapas.find(e => e.id === this.alocacao.etapaId);
            const _justificativa = this.alocacao.justificativa;

            horas_string = "";
            for (let i = 1; i <= 6; i++) {
                horas_string += this.alocacao["hrsMes" + i] + "h ";
            }


            logProjeto.statusAnterior = `<b>Recurso Humano:</b> ${_rh.nomeCompleto}<br>
        <b>Etapa:</b> ${_etapa.numeroEtapa}<br>
        <b>Empresa Financiadora:</b> ${_empresa.catalogEmpresa ? _empresa.catalogEmpresa.nome : _empresa.razaoSocial}<br>
        <b>Horas:</b> ${horas_string}<br>
        <b>Justificativa do Recurso:</b> ${_justificativa}<br>`;

            logProjeto.acao = acao || "Update";
        }

        const request = this.app.projetos.criarLogProjeto(logProjeto);

        request.subscribe(result => {
            if (result.sucesso) {
                this.activeModal.close(result);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        });
    }

    submit() {
        if (this.form.valid) {
            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRH(this.form.value) : this.app.projetos.criarAlocacaoRH(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.logProjeto("Alocação de Recurso Humano");
                    this.activeModal.close(result);
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }

    excluir() {
        this.app.confirm("Tem certeza que deseja excluir esta alocação do recurso humano?", "Confirmar Exclusão")
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delAlocacaoRH(this.alocacao.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            this.logProjeto("Alocação de Recurso Humano", "Delete");
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
