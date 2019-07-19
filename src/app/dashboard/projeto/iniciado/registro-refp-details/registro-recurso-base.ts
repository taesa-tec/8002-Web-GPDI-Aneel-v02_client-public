import {Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RegistroREFP, ResultadoResponse, NoRequest, CategoriasContabeis} from '@app/models';
import {ProjetoFacade} from '@app/facades/index';
import {zip, Observable, of} from 'rxjs';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import * as moment from 'moment';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {tap, map} from 'rxjs/operators';
import {LoggerDirective} from '@app/logger/logger.directive';

export abstract class RegistroRecursoBase implements OnInit {

    etapas: Array<Etapa>;
    recursos: Array<any>;
    projeto: ProjetoFacade;
    recurso: FormControl;
    empresas: Array<{ id: number; nome: string; classificacao: string; }>;
    empresasFinanciadoras: Array<{ id: number; nome: string; classificacao: string; }>;
    empresasRecebedoras: Array<{ id: number; nome: string; classificacao: string; }>;
    categoriasContabeis: Array<any>;
    tipoDocs = TiposDoc;
    form: FormGroup;
    obsInternas: FormGroup;
    mesesRef: Array<TextValue>;


    @Input() registro: RegistroREFP;

    @Output() registroAlterado: EventEmitter<void> = new EventEmitter();

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild('file') file: ElementRef;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(protected app: AppService) {
    }

    get status() {
        if (this.registro) {
            return this.registro.statusValor.toLocaleLowerCase();
        }
        return '';
    }

    get isEditable() {
        return this.status === 'reprovado';
    }

    protected abstract getRecursos(projeto: ProjetoFacade): Observable<any>;

    ngOnInit() {
        this.loadData();
    }

    async loadData() {

        this.projeto = await this.app.projetos.getCurrent();

        const empresas$ = this.projeto.relations.empresas.get();
        const etapas$ = this.projeto.isPD ? this.projeto.REST.Etapas.listar<Array<Etapa>>() : of([]);
        const recursos$ = this.getRecursos(this.projeto);
        const categoriasContabeis$ = this.projeto.isPD ? of(CategoriasContabeis) : this.app.catalogo.categoriasContabeisGestao().pipe(map(cats => cats.map(c => {
            return {
                text: c.nome,
                value: c.id,
                atividades: c.atividades
            };
        })));

        this.loading.show();
        zip(recursos$, empresas$, etapas$, categoriasContabeis$).subscribe(([recursos, empresas, etapas, categoriasContabeis]) => {
            this.etapas = etapas;
            this.recursos = recursos;
            this.categoriasContabeis = categoriasContabeis;
            this.empresas = empresas.map(e => {
                return {
                    id: e.id,
                    nome: e.catalogEmpresaId ? `${e.catalogEmpresa.nome} - ${e.catalogEmpresa.valor}` : e.razaoSocial,
                    classificacao: e.classificacaoValor
                };
            });
            this.empresasFinanciadoras = this.empresas.filter(e => e.classificacao !== 'Executora');
            this.empresasRecebedoras = this.empresas;

            this.buildForm();
            this.loading.hide();
        });
        // const empresas = this.app.projetos

    }

    buildForm() {
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
    }

    buildFormObs() {
        this.obsInternas = new FormGroup({
            texto: new FormControl('', Validators.required)
        });
        this.form.addControl('obsInternas', new FormArray([this.obsInternas]));
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
                                    .subscribe(r => {
                                        subscribe.next(r);
                                    }, e => subscribe.error(e));
                            }, error => {
                                subscribe.error(error);
                            });
                    });

            }
        };

        request().subscribe(result => {
            if (result.sucesso) {
                this.registroAlterado.emit();
                this.app.alert('Alterado com sucesso!');
                if (this.logger) {
                    this.logger.saveStatus(status);
                }
            } else {
                this.app.alert(result.inconsistencias);
            }

        });
    }

    removerRegistro() {
        this.app.confirm('Tem certeza que deseja remover este registro', 'Confirme').then(response => {

            if (response) {
                this.loading.show();
                this.projeto.relations.REFP.removerRegistro(this.registro.id).subscribe(result => {
                    this.loading.hide();

                    if (result.sucesso) {
                        this.registroAlterado.emit();
                        this.app.alert('Excluído com sucesso!');
                        if (this.logger) {
                            this.logger.saveDelete();
                        }
                    } else {
                        this.app.alert(result.inconsistencias);
                    }
                });
            }
        });
    }

    enviarAprovacao() {
        this.loading.show();

        this.projeto.relations.REFP.reenviarAprovacaoRegistro(this.form.value, this.obsInternas.get('texto').value).subscribe(resultado => {
            this.loading.hide();
            if (resultado.sucesso) {
                this.sendFile(this.registro.id).subscribe(_result => {
                    this.app.alert('Enviado para a aprovação');
                    this.registroAlterado.emit();
                });
            } else {
                this.app.alert(resultado.inconsistencias);
            }
        });

    }

    editarRegistro() {
        this.registro.statusValor = 'Reprovado';
        this.buildFormObs();
        this.form.enable();
        this.form.updateValueAndValidity();
    }

    deletarArquivo(file) {
        this.app.confirm('Tem certeza que deseja remover este arquivo?').then(response => {
            if (response) {
                this.loading.show();
                this.registro.uploads.splice(this.registro.uploads.indexOf(file), 1);
                this.app.file.remover(file).subscribe((result: ResultadoResponse) => {
                    this.loading.hide();
                    if (result.sucesso) {
                        this.app.alert('Excluido com sucesso');
                    } else {
                        this.app.alert(result.inconsistencias, 'Erro');
                    }
                }, error => {
                    this.loading.hide();
                });
            }
        });

    }

    changeFile(event) {
    }

    sendFile(id?) {
        const el = this.file.nativeElement as HTMLInputElement;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                RegistroFinanceiroId: new FormControl(id),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.logger.save(`Arquivo ${el.files.item(0).name} adicionado`);
                    this.file.nativeElement.value = '';
                }
            }));
        }

        return of(NoRequest);
    }

}
