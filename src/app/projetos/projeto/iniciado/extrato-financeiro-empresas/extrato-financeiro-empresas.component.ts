import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {zip, of} from 'rxjs';

import {AppService} from '@app/app.service';
import {Projeto, OrcamentosEmpresas, Etapa, TextValue, CategoriasContabeis, ExtratoItem, ResultadoResponse, ExtratosEmpresas, ExtratoEmpresa} from '@app/models';
import {LoadingComponent} from '@app/shared/loading/loading.component';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlocarRecursoHumanoFormComponent} from '@app/projetos/projeto/common/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {AlocarRecursoMaterialFormComponent} from '@app/projetos/projeto/common/alocar-recurso-material-form/alocar-recurso-material-form.component';
import {ProjetoFacade} from '@app/facades';
import {RegistroRefpDetailsComponent} from '../registro-refp-details/registro-refp-details.component';

@Component({
    selector: 'app-extrato-financeiro-empresas',
    templateUrl: './extrato-financeiro-empresas.component.html',
    styleUrls: ['./extrato-financeiro-empresas.component.scss']
})
export class ExtratoFinanceiroEmpresasComponent implements OnInit {

    projeto: ProjetoFacade;
    extrato: ExtratosEmpresas;
    etapas: { [propName: number]: Etapa } = {};

    alocacoesRH: Array<any> = [];
    alocacoesRM: Array<any> = [];

    categoriasContabeis: { [propName: string]: TextValue } = {
        'RH': {text: 'Recursos Humanos', value: 'RH'}
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get extratoEmpresas(): ExtratoEmpresa[] {
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

    itemDesc(item: ExtratoItem) {
        if (item.recursoHumano) {
            return item.recursoHumano.nomeCompleto;
        }
        if (item.registroFinanceiro && item.registroFinanceiro.nomeItem) {
            return item.registroFinanceiro.nomeItem;
        }
        return item.desc;
    }

    calcDesvio(n: number) {
        return ((100 - n) / 100).toFixed(2).concat('%');
    }

    categoriaPorCod(cod) {
        if (this.categoriasContabeis[cod]) {
            return this.categoriasContabeis[cod].text;
        }
        return '';
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
        const extratos$ = this.app.projetos.extratoREFP(this.projeto.id);
        const etapas$ = this.projeto.isPD ? this.app.projetos.getEtapas(this.projeto.id) : of([]);
        zip(extratos$, etapas$, this.app.projetos.getAlocacaoRH(this.projeto.id), this.app.projetos.getAlocacaoRM(this.projeto.id))
            .subscribe(([extrato, etapas, alocacoesRH, alocacoesRM]) => {
                this.extrato = extrato;
                this.alocacoesRH = alocacoesRH;
                this.alocacoesRM = alocacoesRM;
                if (etapas) {
                    etapas.forEach((etapa, index) => {
                        this.etapas[etapa.id] = Object.assign(etapa, {numeroEtapa: index + 1});
                    });
                }

                this.loading.hide();
            });
    }

    openModal(item: ExtratoItem) {
        const registro = item.registroFinanceiro;
        const empresa = item.registroFinanceiro.empresaFinanciadora;
        const recurso = item.registroFinanceiro.recursoHumano || item.registroFinanceiro.recursoMaterial;

        const registroItem = {
            registro,
            nome: '',
            categoria: '',
            empresa,
            valor: 0,
            tipo: registro.tipoValor
        };

        if (registro.tipoValor === 'RH') {
            if (recurso) {
                registroItem.nome = recurso.nomeCompleto;
                registroItem.categoria = 'Recursos Humanos';
                registroItem.valor = recurso.valorHora * registro.qtdHrs;
            } else {
                registroItem.nome = 'Não encontrado';
            }

        } else {
            const categoriaContabil = CategoriasContabeis.find(c => c.value === recurso.categoriaContabilValor);
            registroItem.nome = registro.nomeItem;
            registroItem.categoria = categoriaContabil.text;
            registroItem.valor = registro.qtdItens * registro.valorUnitario;
        }

        const ref = this.app.modal.open(RegistroRefpDetailsComponent, {size: 'lg', backdrop: 'static'});

        ref.componentInstance.setRegistro(registroItem);

        ref.result.then(r => {
            this.load();
        }, e => {
            // Só cancelou nada a fazer
        });
    }
}
