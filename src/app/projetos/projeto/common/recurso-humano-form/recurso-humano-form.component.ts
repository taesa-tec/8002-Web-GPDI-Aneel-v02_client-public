import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto, Funcoes, Graduacoes, EmpresaProjeto, Empresa, AppValidators, RecursoHumano } from '@app/models';
import { AppService } from '@app/app.service';
import { zip } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-recurso-humano-form',
    templateUrl: './recurso-humano-form.component.html',
    styles: []
})
export class RecursoHumanoFormComponent implements OnInit {

    projeto: ProjetoFacade;
    funcoes = Funcoes;
    titulacao = Graduacoes;
    empresas: Array<any>;
    empresasCatalog: Array<Empresa>;
    recursoHumano: RecursoHumano;
    nacionalidades = [{ value: 'Brasileiro', text: "Sim" }, { value: 'Estrangeiro', text: "Não" }];
    nacionalidade: FormControl;
    form: FormGroup;
    hasManager = false;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) { }

    get modalTitle() {
        return typeof this.recursoHumano.id !== 'undefined' ? "Editar Recurso Humano" : "Registrar Recurso Humano";
    }

    get buttonAction() {
        return typeof this.recursoHumano.id !== 'undefined' ? { text: "Editar Pessoa", icon: 'ta-save' } :
            { text: "Salvar Pessoa", icon: 'ta-plus-circle' };
    }

    ngOnInit() {

        this.loadData();
    }

    loadData() {
        this.loading.show();
        const empresas$ = this.projeto.relations.empresas.get();
        const empresasCatalog$ = this.app.catalogo.empresas();
        const recursos$ = this.projeto.REST.RecursoHumanos.listar<Array<RecursoHumano>>();

        zip(empresas$, empresasCatalog$, recursos$).subscribe(([empresas, empresasCatalog, recursos]) => {

            this.hasManager = recursos.find(rec => rec.gerenteProjeto) !== null;
            this.empresasCatalog = empresasCatalog;
            this.empresas = empresas;
            this.setup();
            this.loading.hide();
        });
    }

    setup() {
        const cpf = new FormControl(this.recursoHumano.cpf || '', [Validators.required, AppValidators.cpf]);
        const passaporte = new FormControl(this.recursoHumano.passaporte || '', Validators.required);
        const empresaCtrl = new FormControl(this.recursoHumano.empresaId || '', Validators.required);
        this.nacionalidade = new FormControl('', Validators.required);


        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            empresaId: empresaCtrl,
            valorHora: new FormControl(this.recursoHumano.valorHora || '', Validators.required),
            nomeCompleto: new FormControl(this.recursoHumano.nomeCompleto || '', Validators.required),
            titulacao: new FormControl(this.recursoHumano.titulacaoValor || '', Validators.required),
            funcao: new FormControl(this.recursoHumano.funcaoValor || '', Validators.required),
            nacionalidade: this.nacionalidade,
            urlCurriculo: new FormControl(this.recursoHumano.urlCurriculo || '', [Validators.required, Validators.pattern(/^https?:\/\/(.+)\.(.+)/)]),
        });

        if (this.projeto.isPG) {
            this.form.addControl('gerenteProjeto', new FormControl(this.recursoHumano.gerenteProjeto || (this.hasManager ? 'false' : ''), Validators.required));
        } else {
            this.form.addControl('funcao', new FormControl(this.recursoHumano.funcaoValor || '', Validators.required));

        }

        empresaCtrl.valueChanges.subscribe(value => {
            const _empresa = this.empresas.find(e => e.id === parseInt(value, 10));

            if (_empresa.classificacaoValor !== "Executora") {
                this.nacionalidade.reset({ value: 'Brasileiro', disabled: true });
            } else {
                this.nacionalidade.reset({ value: 'Brasileiro', disabled: false });
            }

        });

        this.nacionalidade.valueChanges.subscribe(value => {
            if (value === 'Brasileiro') {
                this.form.addControl('cpf', cpf);
                this.form.removeControl('passaporte');
            } else {
                this.form.removeControl('cpf');
                this.form.addControl('passaporte', passaporte);
            }
        });

        this.nacionalidade.setValue(this.recursoHumano.nacionalidadeValor || 'Brasileiro');

        if (this.recursoHumano.nacionalidadeValor && this.recursoHumano.empresaId) {
            console.log(this.recursoHumano);

        }

        if (this.recursoHumano.id !== undefined) {
            this.form.addControl('id', new FormControl(this.recursoHumano.id));
        }
    }



    submit() {
        if (this.form.valid) {

            const request = this.recursoHumano.id ? this.app.projetos.editarRH(this.form.value) : this.app.projetos.criarRH(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.activeModal.close(result);
                    this.logProjeto("Recurso Humano");
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }



    excluir() {
        this.app.confirm("Tem certeza que deseja excluir esta pessoa?", "Confirmar Exclusão")
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delRH(this.recursoHumano.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            this.logProjeto("Recurso Humano", "Delete");
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

    logProjeto(tela: string, acao?: string) {

        const logProjeto = {
            userId: this.app.users.currentUser.id,
            projetoId: this.projeto.id,
            tela,
            acao: acao || "Create",
            statusAnterior: "",
            statusNovo: ""
        };

        const empresa = this.empresas.find(e => e.id === parseInt(this.form.get("empresaId").value, 10));
        const titulo = this.titulacao.find(t => t.value === this.form.get("titulacao").value).text;
        const funcao = this.funcoes.find(f => f.value === this.form.get("funcao").value).text;
        const real = (new CurrencyPipe('pt')).transform(this.form.get("valorHora").value, 'R$');

        logProjeto.statusNovo = "<b>Empresa:</b> " + empresa["Empresa"] + "<br>";
        logProjeto.statusNovo += "<b>Valor Hora:</b> " + real + "<br>";
        logProjeto.statusNovo += "<b>Nome Completo:</b> " + this.form.get("nomeCompleto").value + "<br>";
        logProjeto.statusNovo += "<b>Titulo:</b> " + titulo + "<br>";
        logProjeto.statusNovo += "<b>Função:</b> " + funcao + "<br>";
        logProjeto.statusNovo += "<b>Nacionalidade:</b> " + this.form.get("nacionalidade").value + "<br>";

        if (this.form.get("cpf")) {
            logProjeto.statusNovo += "<b>CPF:</b> " + this.form.get("cpf").value + "<br>";
        }
        if (this.form.get("passaporte")) {
            logProjeto.statusNovo += "<b>Passaporte:</b> " + this.form.get("passaporte").value + "<br>";
        }

        logProjeto.statusNovo += "<b>Endereço Currículo Lattes:</b> " + this.form.get("urlCurriculo").value + "<br>";

        if (acao === "Delete") {
            logProjeto.statusNovo = "";
        }

        if (this.recursoHumano.id !== undefined) {

            const _empresa = this.empresas.find(e => e.id === this.recursoHumano.empresaId);
            const _titulo = this.titulacao.find(t => t.value === this.recursoHumano.titulacaoValor).text;
            const _funcao = this.funcoes.find(f => f.value === this.recursoHumano.funcaoValor).text;
            const real = (new CurrencyPipe('pt')).transform(this.recursoHumano.valorHora, 'R$');

            logProjeto.statusAnterior = "<b>Empresa:</b> " + _empresa["Empresa"] + "<br>";
            logProjeto.statusAnterior += "<b>Valor Hora:</b> " + this.recursoHumano.valorHora + "<br>";
            logProjeto.statusAnterior += "<b>Nome Completo:</b> " + this.recursoHumano.nomeCompleto + "<br>";
            logProjeto.statusAnterior += "<b>Titulo:</b> " + _titulo + "<br>";
            logProjeto.statusAnterior += "<b>Função:</b> " + _funcao + "<br>";
            logProjeto.statusAnterior += "<b>Nacionalidade:</b> " + this.recursoHumano.nacionalidadeValor + "<br>";

            if (this.recursoHumano.cpf) {
                logProjeto.statusAnterior += "<b>CPF:</b> " + this.recursoHumano.cpf + "<br>";
            }
            if (this.recursoHumano.passaporte) {
                logProjeto.statusAnterior += "<b>Passaporte:</b> " + this.recursoHumano.passaporte + "<br>";
            }

            logProjeto.statusAnterior += "<b>Endereço Currículo Lattes:</b> " + this.recursoHumano.urlCurriculo + "<br>";

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
}
