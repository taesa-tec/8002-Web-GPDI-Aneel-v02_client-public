import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, NoRequest } from '@app/models';
import { ProjetoFacade, EmpresaProjetoFacade } from '@app/facades';
import { zip, of } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-recurso-humano',
    templateUrl: './recurso-humano.component.html',
    styles: []
})
export class RecursoHumanoComponent implements OnInit {


    etapas: Array<Etapa>;
    projeto: ProjetoFacade;
    recursos: Array<RecursoHumano>;
    recurso: FormControl;
    qtdHrs: FormControl;

    tipoDocs = TiposDoc;
    form: FormGroup;
    obsInternas: FormGroup;
    mesesRef: Array<TextValue>;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild('file') file: ElementRef;

    empresas: Array<EmpresaProjetoFacade>;
    // empresasRecebedoras: Array<{ id: number; nome: string; classificacao: string; }>;

    get empresasFinanciadoras(): Array<EmpresaProjetoFacade> {
        if (this.empresas === undefined) {
            return [];
        }


        if (this.recurso) {
            const recursoHumanoId = parseInt(this.recurso.value, 10);
            const recurso = this.recursos.find(r => {
                return r.id === recursoHumanoId;
            });

            const recursoEmpresa = recurso ? this.empresas.find(e => e.id === recurso.empresaId) : undefined;
            return this.empresas.filter(empresa => {
                if (recursoEmpresa && recursoEmpresa.classificacaoValor.match(/(Energia|Proponente)/) !== null) {
                    return recursoEmpresa.id === empresa.id;
                }
                return empresa.classificacaoValor.match(/(Executora)/) === null;
            });
        }

        return [];
    }

    constructor(protected app: AppService) { }

    get valorFinal() {

        if (this.recurso) {
            const recursoHumanoId = parseInt(this.recurso.value, 10);
            const recurso = this.recursos.find(r => {
                return r.id === recursoHumanoId;
            });


            if (recurso && this.qtdHrs.value.length > 0) {
                return parseInt(this.qtdHrs.value, 10) * recurso.valorHora;
            }
        }


        return 0;
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {

            this.projeto = projeto;

            const recursos$ = this.projeto.relations.recursosHumanos.get();
            const empresas$ = this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>();
            const etapas$ = this.projeto.isPD ? this.projeto.REST.Etapas.listar<Array<Etapa>>() : of([]);

            this.loading.show(1000);
            zip(recursos$, empresas$, etapas$).subscribe(([recursos, empresas, etapas]) => {
                this.etapas = etapas;
                this.recursos = recursos;
                this.empresas = empresas.map(e => new EmpresaProjetoFacade(e));
                this.buildForm();
            });
            // const empresas = this.app.projetos

        });
    }

    buildForm() {
        this.obsInternas = new FormGroup({
            texto: new FormControl('')
        });

        this.recurso = new FormControl('', [Validators.required]);

        this.qtdHrs = new FormControl('', [Validators.required]);

        this.mesesRef = [];

        if (this.projeto.isPD) {
            this.etapas.map(etapa => {
                const start = moment(etapa.dataInicio);
                const end = moment(etapa.dataFim);
                while (start.isBefore(end)) {
                    const ano = start.format('YYYY');
                    const mes = start.format('MMMM'); // .padEnd(9, '*').replace(/\*/g, '&nbsp;');
                    this.mesesRef.push({
                        text: `${mes} - ${ano}`,
                        value: start.format('YYYY-MM-DD')
                    });
                    start.add(1, 'months');
                }
            });
        } else {
            const start = moment(this.projeto.dataInicio);
            const end = moment(this.projeto.dataInicio).add(24, 'months');
            while (start.isBefore(end)) {
                const ano = start.format('YYYY');
                const mes = start.format('MMMM'); // .padEnd(9, '*').replace(/\*/g, '&nbsp;');
                this.mesesRef.push({
                    text: `${mes} - ${ano}`,
                    value: start.format('YYYY-MM-DD')
                });
                start.add(1, 'month');
            }
        }

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl("RH"),
            recursoHumanoId: this.recurso,
            empresaFinanciadoraId: new FormControl('', [Validators.required]),
            mes: new FormControl('', [Validators.required]),
            qtdHrs: this.qtdHrs,
            tipoDocumento: new FormControl('', [Validators.required]),
            numeroDocumento: new FormControl('', [Validators.required]),
            dataDocumento: new FormControl('', [Validators.required]),
            atividadeRealizada: new FormControl('', [Validators.required]),
            obsInternas: new FormArray([this.obsInternas])
        });

        this.recurso.valueChanges.subscribe(v => {
            this.form.get('empresaFinanciadoraId').setValue('');
        })
    }


    submit() {
        if (this.form.valid) {
            this.loading.show();
            this.app.projetos.criarRegistroREFP(this.form.value).subscribe(result => {
                if (result.sucesso) {
                    this.sendFile(result.id).subscribe(_result => {
                        this.loading.hide();
                        this.form.reset();
                        this.app.alert("Salvo com sucesso!");
                    });
                } else {
                    this.loading.hide();
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });
        }
    }
    changeFile(event) { }
    sendFile(id?) {
        const el = this.file.nativeElement as HTMLInputElement;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                RegistroFinanceiroId: new FormControl(id),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.file.nativeElement.value = "";
                }
            }));
        }

        return of(NoRequest);
    }

}
