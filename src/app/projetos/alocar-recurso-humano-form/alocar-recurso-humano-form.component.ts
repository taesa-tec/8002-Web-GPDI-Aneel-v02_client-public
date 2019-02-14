import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { AppService } from '@app/app.service';
import { Projeto, RecursosHumanos, Etapa, EmpresaProjeto } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { zip } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-alocar-recurso-humano-form',
    templateUrl: './alocar-recurso-humano-form.component.html',
    styleUrls: ['./alocar-recurso-humano-form.component.scss']
})
export class AlocarRecursoHumanoFormComponent implements OnInit {

    projeto: Projeto;
    recursosHumano: RecursosHumanos;
    etapas: Array<Etapa>;
    empresasFinanciadora: EmpresaProjeto;
    form: FormGroup;
    horasAlocadas: Array<any> = [];
    etapaMarcada = false;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService,
        private projetoService: ProjetosService) { }

    ngOnInit() {
        this._horaAlocadas();
        this.loadData();
        this.setup();
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

        const etapa = new FormControl('', Validators.required);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoHumanoId: new FormControl('', Validators.required),
            etapaId: etapa,
            empresaId: new FormControl('', Validators.required),
            justificativa: new FormControl('', Validators.required),
            //valorHora: new FormControl('',Validators.required),
            //hrsMes1: new FormControl('',Validators.required), esta na funções horasAlocadas()
        });


        this._form_horaAlocadas();

        etapa.valueChanges.subscribe(value => {

            this.etapaMarcada = true;

            const etapaVal = this.etapas.find(e => e.id === parseInt(value, 10));

            this._horaAlocadas(6, etapaVal);

            this._form_horaAlocadas();

        });

        /* if (this.alocacao.id !== undefined) {
            this.form.addControl('id', new FormControl(this.alocacao.id));
        } */
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

            this.loading.hide();
        });
    }

    submit() {
        if (this.form.valid) {
            //const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRH(this.form.value) : this.app.projetos.criarAlocacaoRH(this.form.value);
            const request = this.app.projetos.criarAlocacaoRH(this.form.value);
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

}
