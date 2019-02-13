import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterial, Projeto, AlocacaoRM, Empresa } from '@app/models';
import { AppService } from '@app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { zip } from 'rxjs';

@Component({
    selector: 'app-alocar-recurso-material-form',
    templateUrl: './alocar-recurso-material-form.component.html',
    styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent implements OnInit {

    recursosMaterias: Array<any>;
    empresaRecebdora: Array<any>;
    empresaFinanciadora: Array<any>;
    empresasCatalog: Array<Empresa>;
    etapas: Array<any>;
    alocacao: AlocacaoRM;
    projeto: Projeto;
    form: FormGroup;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) { }

    get modalTitle() {
        return typeof this.alocacao.id !== 'undefined' ? "Editar Alocamento Recurso Material" : "Alocar Recurso Material";
    }

    get buttonAction() {
        return typeof this.alocacao.id !== 'undefined' ? { text: "Salvar Alterações", icon: 'ta-save' } :
            { text: "Alocar Recurso Material", icon: 'ta-plus-circle' };
    }

    ngOnInit() {
        this.loadData();
        this.setup();
    }

    setup() {

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoMaterialId: new FormControl(this.alocacao.recursoMaterialId || '', [Validators.required]),
            etapaId: new FormControl(this.alocacao.etapaId || '', [Validators.required]),
            empresaFinanciadoraId: new FormControl(this.alocacao.empresaFinanciadoraId || '', [Validators.required]),
            empresaRecebedoraId: new FormControl(this.alocacao.empresaRecebedoraId || '', [Validators.required]),
            qtd: new FormControl(this.alocacao.qtd || '', [Validators.required]),
            justificativa: new FormControl(this.alocacao.justificativa || '', [Validators.required]),
        });

        if (this.alocacao.id !== undefined) {
            this.form.addControl('id', new FormControl(this.alocacao.id));
        }

    }

    submit() {
        if (this.form.valid) {

            /* const empresaFID = this.form.get("empresaFinanciadoraId").value;
            const empresaRID = this.form.get("empresaRecebedoraId").value;

            if (empresaFID && empresaRID) {
                this.form.addControl('empresaFinanciadora', new FormControl(this.empresasCatalog.find(e => e.id === empresaFID)));
                this.form.addControl('empresaRecebedora', new FormControl(this.empresasCatalog.find(e => e.id === empresaRID)));
            } */

            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRM(this.form.value) : this.app.projetos.criarAlocacaoRM(this.form.value);
            this.loading.show();
            request.subscribe(result => {

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

        const recm$ = this.app.projetos.getRecursoMaterial(this.projeto.id);
        const empresa$ = this.app.projetos.getEmpresas(this.projeto.id);
        const etapa$ = this.app.projetos.getEtapas(this.projeto.id);
        const empresas_catalog$ = this.app.catalogo.empresas();

        zip(recm$, empresa$, etapa$, empresas_catalog$).subscribe(([recursosMaterias, empresas, etapas, empresas_catalog]) => {

            this.recursosMaterias = recursosMaterias || [];

            this.etapas = etapas.map((etapa, i) => { etapa.numeroEtapa = i + 1; return etapa; });

            this.empresasCatalog = empresas_catalog;

            this.empresaRecebdora = empresas.map((emR, i) => {

                emR.Empresa = emR.razaoSocial ? emR.razaoSocial : '';

                if (emR.catalogEmpresaId) {
                    emR.catalogEmpresa = empresas_catalog.find(e => emR.catalogEmpresaId === e.id);
                    emR.Empresa = emR.catalogEmpresa.nome;
                }

                return emR;
            });

            this.empresaFinanciadora = empresas.filter(item => item.classificacaoValor !== "Executora");

            this.loading.hide();
        });
    }

}
