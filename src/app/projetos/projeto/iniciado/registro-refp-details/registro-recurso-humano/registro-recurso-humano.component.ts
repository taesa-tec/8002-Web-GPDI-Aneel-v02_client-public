import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RegistroREFP, ResultadoResponse } from '@app/models';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { zip, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-registro-recurso-humano',
    templateUrl: './registro-recurso-humano.component.html',
    styles: []
})
export class RegistroRecursoHumanoComponent implements OnInit {



    etapas: Array<Etapa>;
    projeto: ProjetoFacade;
    recursos: Array<RecursoHumano>;
    recurso: FormControl;
    qtdHrs: FormControl;
    empresas: Array<{ id: number; nome: string; }>;
    tipoDocs = TiposDoc;
    form: FormGroup;
    obsInternas: FormArray;
    mesesRef: Array<TextValue>;

    @Input() registro: RegistroREFP;

    @Output() registroAlterado: EventEmitter<void> = new EventEmitter();

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) { }

    get valorFinal() {

        if (this.recurso) {
            const qtdHrs = this.qtdHrs.value;
            const recursoHumanoId = parseInt(this.recurso.value, 10);
            const recurso = this.recursos.find(r => {
                return r.id === recursoHumanoId;
            });
            if (recurso && qtdHrs > 0) {
                return qtdHrs * recurso.valorHora;
            }
        }



        return 0;
    }

    get isPendente() {
        return this.registro.statusValor === 'Pendente';
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {

            this.projeto = projeto;

            const recursos$ = this.projeto.relations.recursosHumanos.get();
            const empresas$ = this.projeto.relations.empresas.get();
            const etapas$ = this.projeto.relations.etapas.get();

            this.loading.show(1000);
            zip(recursos$, empresas$, etapas$).subscribe(([recursos, empresas, etapas]) => {
                this.etapas = etapas;
                this.recursos = recursos;
                this.empresas = empresas.map(e => {
                    const empresa = {
                        id: e.id,
                        nome: e.catalogEmpresaId ? `${e.catalogEmpresa.nome} - ${e.catalogEmpresa.valor}` : e.razaoSocial
                    };
                    return empresa;
                });

                this.buildForm();
            });
            // const empresas = this.app.projetos

        });
    }

    buildForm() {
        const mes = moment(this.registro.mes).format('YYYY-MM-DD');
        const dataDocumento = moment(this.registro.dataDocumento).format('YYYY-MM-DD');

        this.recurso = new FormControl(this.registro.recursoHumanoId, [Validators.required]);

        this.qtdHrs = new FormControl(this.registro.qtdHrs, [Validators.required]);

        this.mesesRef = [];

        this.etapas.map(etapa => {

            let start = moment(etapa.dataInicio);
            const end = moment(etapa.dataFim);

            while (start.isBefore(end)) {
                this.mesesRef.push({
                    text: start.format('MMMM YYYY'),
                    value: start.format('YYYY-MM-DD')
                });
                start.add(1, 'M');
                if (this.mesesRef.length > 10) {
                    break;
                }

            }
        });

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl("RH"),
            recursoHumanoId: this.recurso,
            empresaFinanciadoraId: new FormControl(this.registro.empresaFinanciadoraId, [Validators.required]),
            mes: new FormControl(mes, [Validators.required]),
            qtdHrs: this.qtdHrs,
            tipoDocumento: new FormControl('', [Validators.required]),
            numeroDocumento: new FormControl(this.registro.numeroDocumento, [Validators.required]),
            dataDocumento: new FormControl(dataDocumento, [Validators.required]),
            atividadeRealizada: new FormControl(this.registro.atividadeRealizada, [Validators.required])
        });

        if (this.isPendente) {
            this.form.disable();
        }
    }

    submit() {

        if (this.form.valid) {
            this.loading.show();
            this.app.projetos.criarRegistroREFP(this.form.value).subscribe(result => {
                this.loading.hide();
                if (result.sucesso) {
                    this.app.alert("Salvo com sucesso!");
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });
        }

    }

    saveStatus(status: 'aprovado' | 'reprovado') {
        const request = (): Observable<ResultadoResponse> => {
            switch (status) {
                case 'aprovado':
                    return this.projeto.relations.REFP.aprovarRegistro(this.registro.id);
                case 'reprovado':
                    return new Observable(subscribe => {
                        this.app.prompt('Motivo da reprovação (será adicionado as observações internas)', 'Reprovar Registro')
                            .then(motivo => {
                                this.projeto.relations.REFP.reprovarRegistro(this.registro.id, motivo)
                                    .subscribe(r => subscribe.next(r), e => subscribe.error(e));
                            }, error => {
                                subscribe.error(error);
                            });
                    });

            }
        };

        request().subscribe(result => {
            if (result.sucesso) {

                this.registroAlterado.emit();

                this.app.alert("Alterado com sucesso!");
            } else {
                this.app.alert(result.inconsistencias);
            }

        });
    }

    removerRegistro() {
        this.projeto.relations.REFP.removerRegistro(this.registro.id).subscribe(result => {
            if (result.sucesso) {
                this.app.alert("Excluído com sucesso!");
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        });
    }


}
