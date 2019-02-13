import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto, Funcao, Titulacao, EmpresaProjeto, Empresa, AppValidators } from '@app/models';
import { AppService } from '@app/app.service';
import { zip } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    nacionalidades = [{ value: 'Brasileiro', text: "Sim" }, { value: 'Estrangeiro', text: "Não" }];
    nacionalidade = new FormControl('', Validators.required);
    form: FormGroup;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) { }

    ngOnInit() {
        this.setup();
        this.loadData();
    }

    setup() {

        const cpfCtrl = new FormControl('', [Validators.required, AppValidators.cpf]);
        const passaporte = new FormControl('', Validators.required);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            empresaId: new FormControl('', Validators.required),
            valorHora: new FormControl('', Validators.required),
            nomeCompleto: new FormControl('', Validators.required),
            titulacao: new FormControl('', Validators.required),
            funcao: new FormControl('', Validators.required),
            nacionalidade: this.nacionalidade,
            urlCurriculo: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/(.+)\.(.+)/)]),
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


        /* if (this.recursoMaterial.id !== undefined) {
            this.form.addControl('id', new FormControl(this.recursoMaterial.id));
        } */
    }

    submit() {
        if (this.form.valid) {
            const request = this.app.projetos.criarRH(this.form.value);
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
}
