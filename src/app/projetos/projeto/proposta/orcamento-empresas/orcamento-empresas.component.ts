import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {zip, of} from 'rxjs';

import {AppService} from '@app/app.service';
import {Projeto, OrcamentosEmpresas, Etapa, TextValue, CategoriasContabeis, ExtratoItem, ResultadoResponse, Empresa, EmpresaProjeto} from '@app/models';
import {LoadingComponent} from '@app/shared/loading/loading.component';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlocarRecursoHumanoFormComponent} from '@app/projetos/projeto/common/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {AlocarRecursoMaterialFormComponent} from '@app/projetos/projeto/common/alocar-recurso-material-form/alocar-recurso-material-form.component';
import {ProjetoFacade, EmpresaProjetoFacade} from '@app/facades';

@Component({
    selector: 'app-orcamento-empresas',
    templateUrl: './orcamento-empresas.component.html',
    styles: []
})
export class OrcamentoEmpresasComponent implements OnInit {

    projeto: ProjetoFacade;
    extrato: OrcamentosEmpresas;
    etapas: { [propName: number]: Etapa } = {};
    empresas: Array<EmpresaProjetoFacade> = [];

    alocacoesRH: Array<any> = [];
    alocacoesRM: Array<any> = [];

    categoriasContabeis: { [propName: string]: TextValue } = {
        'RH': {text: 'Recursos Humanos', value: 'RH'}
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get extratoEmpresas() {
        return this.extrato ? this.extrato.empresas.filter(e => e.total > 0) : [];
    }

    get totalGeral() {
        return this.extrato ? this.extrato.valor : 0;
    }

    constructor(protected app: AppService, private route: ActivatedRoute) {
        CategoriasContabeis.forEach(c => {
            this.categoriasContabeis[c.value] = c;
        });
    }

    categoriaPorCod(cod) {
        if (this.categoriasContabeis[cod]) {
            return this.categoriasContabeis[cod].text;
        }
        return '';
    }

    empresaRecebedoraFromItem(item) {
        const id = item.alocacaoRm ? item.alocacaoRm.empresaRecebedoraId : item.alocacaoRh.empresaId;
        const empresa = this.empresas.find(e => e.id === id);
        if (id === undefined) {
            console.log({item, empresa, id, empresas: this.empresas});
        }

        if (empresa) {

            return empresa.nome;
        }
        return 'Não encontrado';
    }


    ngOnInit() {
        const projeto$ = this.app.projetos.projetoLoaded;
        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.load();
        });
    }

    load() {
        this.loading.show();
        const extratos$ = this.projeto.getOrcamentoEmpresas(); // this.app.projetos.getOrcamentoEmpresas(this.projeto.id);
        const etapas$ = this.projeto.isPD ? this.projeto.REST.Etapas.listar<Array<Etapa>>() : of([]); // this.app.projetos.getEtapas(this.projeto.id);
        const empresas$ = this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>();

        zip(extratos$, etapas$, empresas$, this.projeto.REST.AlocacaoRhs.listar<Array<any>>(), this.projeto.REST.AlocacaoRms.listar<Array<any>>())
            .subscribe(([extrato, etapas, empresas, alocacoesRH, alocacoesRM]) => {
                this.extrato = extrato;
                this.empresas = empresas.map(e => new EmpresaProjetoFacade(e));
                this.alocacoesRH = alocacoesRH;
                this.alocacoesRM = alocacoesRM;

                etapas.forEach((etapa, index) => {
                    this.etapas[etapa.id] = Object.assign(etapa, {numeroEtapa: index + 1});
                });

                this.loading.hide();
            });
    }

    openModal(item: ExtratoItem, itens: Array<any>) {
        let modal: NgbModalRef;

        if (item.recursoHumano) {
            const alocacao = this.alocacoesRH.find(a => a.id === item.alocacaoId);
            modal = this.app.modal.open(AlocarRecursoHumanoFormComponent, {size: 'lg'});
            modal.componentInstance.alocacao = alocacao;

        } else if (item.recursoMaterial) {
            const alocacao = this.alocacoesRM.find(a => a.id === item.alocacaoId);
            modal = this.app.modal.open(AlocarRecursoMaterialFormComponent, {size: 'lg'});
            modal.componentInstance.alocacao = alocacao;
        }

        if (modal) {
            modal.componentInstance.projeto = this.projeto;
            modal.result.then(result => {
                console.log(result);
                if (result === 'deleted') {
                    itens.splice(itens.indexOf(item), 1);
                }
            }, error => {

            });
        }
    }

    orcamentoGerarCSV() {
        this.projeto.orcamentoGerarCSV().subscribe(result => {

        }, error => {
            this.app.alert('Não foi possível gerar o relatório', 'Erro!');
            console.log({error});

        });
    }
}
