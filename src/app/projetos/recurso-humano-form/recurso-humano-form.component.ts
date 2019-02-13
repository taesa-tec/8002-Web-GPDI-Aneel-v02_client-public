import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto, Funcao, Titulacao, EmpresaProjeto, Empresa, AppValidators, RecursosHumanos } from '@app/models';
import { AppService } from '@app/app.service';
import { zip } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-recurso-humano-form',
    templateUrl: './recurso-humano-form.component.html',
    styleUrls: ['./recurso-humano-form.component.scss']
})
export class RecursoHumanoFormComponent implements OnInit {

    projeto: Projeto;
    funcoes = Funcao;
    titulacao = Titulacao;
    empresas: EmpresaProjeto;
    empresasCatalog: Array<Empresa>;
    recursoHumano: RecursosHumanos;
    nacionalidades = [{ value: 'Brasileiro', text: "Sim" }, { value: 'Estrangeiro', text: "Não" }];
    nacionalidade = new FormControl('', Validators.required);
    form: FormGroup;

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
        this.setup();
        this.loadData();
    }

    setup() {

        const cpfCtrl = new FormControl(this.recursoHumano.cpf || '', [Validators.required, AppValidators.cpf]);
        const passaporte = new FormControl(this.recursoHumano.passaporte || '', Validators.required);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            empresaId: new FormControl(this.recursoHumano.empresaId || '', Validators.required),
            valorHora: new FormControl(this.recursoHumano.valorHora || '', Validators.required),
            nomeCompleto: new FormControl(this.recursoHumano.nomeCompleto || '', Validators.required),
            titulacao: new FormControl(this.recursoHumano.titulacaoValor || '', Validators.required),
            funcao: new FormControl(this.recursoHumano.funcaoValor || '', Validators.required),
            nacionalidade: this.nacionalidade,
            urlCurriculo: new FormControl(this.recursoHumano.urlCurriculo || '', [Validators.required, Validators.pattern(/^https?:\/\/(.+)\.(.+)/)]),
        });



        this.nacionalidade.valueChanges.subscribe(value => {
            if (value === 'Brasileiro') {
                this.form.addControl('cpf', cpfCtrl);
                this.form.removeControl('passaporte');
            } else {
                this.form.removeControl('cpf');
                this.form.addControl('passaporte', passaporte);
            }
        });

        this.nacionalidade.setValue(this.recursoHumano.nacionalidadeValor || '');

        if (this.recursoHumano.id !== undefined) {
            this.form.addControl('id', new FormControl(this.recursoHumano.id));
        }
    }

    submit() {
        if (this.form.valid) {
            const request = this.recursoHumano.id ? this.app.projetos.editarRH(this.form.value) : this.app.projetos.criarRH(this.form.value);
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

    loadData() {
        this.loading.show();
        const empresas$ = this.app.projetos.getEmpresas(this.projeto.id);
        const catalog_empresas$ = this.app.catalogo.empresas();

        zip(empresas$, catalog_empresas$).subscribe(([empresas, catalog_empresas]) => {

            this.empresasCatalog = catalog_empresas;

            this.empresas = empresas.map((emR, i) => {

                emR.EmpresaNome = emR.razaoSocial ? emR.razaoSocial : '';

                if (emR.catalogEmpresaId) {
                    emR.catalogEmpresa = catalog_empresas.find(e => emR.catalogEmpresaId === e.id);
                    emR.EmpresaNome = emR.catalogEmpresa.nome;
                }

                return emR;
            });

            this.loading.hide();
        });
    }

    excluir() {
        this.app.confirm("Tem certeza que deseja excluir esta etapa?", "Confirmar Exclusão")
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delRH(this.recursoHumano.id).subscribe(resultDelete => {
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
