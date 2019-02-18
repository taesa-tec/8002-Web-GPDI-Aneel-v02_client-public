import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterial, Projeto, AlocacaoRM, Empresa } from '@app/models';
import { AppService } from '@app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { zip } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
        return typeof this.alocacao.id !== 'undefined' ? "Editar Alocação Recurso Material" : "Alocar Recurso Material";
    }

    get buttonAction() {
        return typeof this.alocacao.id !== 'undefined' ? { text: "Salvar Alterações", icon: 'ta-save' } :
            { text: "Alocar Recurso Material", icon: 'ta-plus-circle' };
    }

    ngOnInit() {
        this.setup();
        this.loadData();
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

    logProjeto(tela: string, acao?: string) {

        const logProjeto = {
            userId: this.app.users.currentUser.id,
            projetoId: this.projeto.id,
            tela,
            acao: acao || "Criação",
            statusAnterior: "",
            statusNovo: ""
        };

        const rm = this.recursosMaterias.find(r => r.id === parseInt(this.form.get("recursoMaterialId").value, 10));
        const emf = this.empresaFinanciadora.find(f => f.id === parseInt(this.form.get("empresaFinanciadoraId").value, 10));
        const emr = this.empresaRecebdora.find(er => er.id === parseInt(this.form.get("empresaRecebedoraId").value, 10));
        const etapa = this.etapas.find(et => et.id === parseInt(this.form.get("etapaId").value, 10));
        const qtd = this.form.get("qtd").value;
        const justificativa = this.form.get("justificativa").value;

        logProjeto.statusNovo = `<b>Recurso Material:</b> ${rm.nome}<br>
        <b>Empresa Financiadora:</b> ${emf.catalogEmpresa ? emf.catalogEmpresa.nome : emf.razaoSocial}<br>
        <b>Empresa Recebedora:</b> ${emr.catalogEmpresa ? emr.catalogEmpresa.nome : emr.razaoSocial}<br>
        <b>Etapa Número:</b> ${etapa.numeroEtapa}<br>
        <b>Quantidade:</b> ${qtd}<br>
        <b>Justificativa:</b> ${justificativa}<br>`;

        if (acao === "Exclusão") {
            logProjeto.statusNovo = "";
        }

        if (this.alocacao.id !== undefined) {

            const _rm = this.alocacao.recursoMaterial;
            const _emf = this.alocacao.empresaFinanciadora;
            const _emr = this.alocacao.empresaRecebedora;
            const _etapa = this.etapas.find(et => et.id === this.alocacao.etapaId);
            const _qtd = this.alocacao.qtd;
            const _justificativa = this.alocacao.justificativa;

            logProjeto.statusAnterior = `<b>Recurso Material:</b> ${_rm.nome}<br>
            <b>Empresa Financiadora:</b> ${_emf.catalogEmpresa ? _emf.catalogEmpresa.nome : _emf.razaoSocial}<br>
            <b>Empresa Recebedora:</b> ${_emr.catalogEmpresa ? _emr.catalogEmpresa.nome : _emr.razaoSocial}<br>
            <b>Etapa Número:</b> ${_etapa.numeroEtapa}<br>
            <b>Quantidade:</b> ${_qtd}<br>
            <b>Justificativa:</b> ${_justificativa}<br>`;

            logProjeto.acao = acao || "Edição";
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

            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRM(this.form.value) : this.app.projetos.criarAlocacaoRM(this.form.value);
            this.loading.show();
            request.subscribe(result => {

                if (result.sucesso) {
                    this.logProjeto("Alocação de recursos Materias");
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

    excluir() {
        this.app.confirm("Tem certeza que deseja excluir esta alocação do recurso material?", "Confirmar Exclusão")
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delAlocacaoRM(this.alocacao.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            this.logProjeto("Alocação de recursos Materias", "Exclusão");
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
