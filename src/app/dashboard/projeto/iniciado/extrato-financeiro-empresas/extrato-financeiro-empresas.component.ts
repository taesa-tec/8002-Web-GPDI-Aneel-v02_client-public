import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip, of } from 'rxjs';

import { AppService } from '@app/core/services/app.service';
import { Projeto, OrcamentosEmpresas, Etapa, TextValue, CategoriasContabeis, ExtratoItem, ResultadoResponse, ExtratosEmpresas, ExtratoEmpresa } from '@app/models';
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';
import { ProjetoFacade } from '@app/facades/index';
import { RegistroRefpDetailsComponent } from '../registro-refp-details/registro-refp-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

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
        'RH': { text: 'Recursos Humanos', value: 'RH' }
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get extratoEmpresas(): ExtratoEmpresa[] {
        return this.extrato ? this.extrato.empresas.filter(e => e.valorAprovado > 0) : [];
    }

    get totalGeral() {
        if (this.extrato) {
            const aprovados = this.extrato.empresas.map(e => e.valorAprovado);

            if (aprovados.length > 0) {
                return aprovados.reduce((p, c) => p + c);
            }
        }
        return 0;
    }


    constructor(protected app: AppService, private route: ActivatedRoute, protected modal: NgbModal) {

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
        return (n - 100).toFixed(2).concat('%');
    }

    categoriaPorCod(cod) {
        if (this.categoriasContabeis[cod]) {
            return this.categoriasContabeis[cod].text;
        }
        return '';
    }


    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();

        if (this.projeto.isPD) {
            CategoriasContabeis.forEach(c => {
                this.categoriasContabeis[c.value] = c;
            });
        } else {
            const ccg = await this.app.catalogo.categoriasContabeisGestao().toPromise();
            ccg.forEach(c => {
                this.categoriasContabeis[c.valor] = {
                    text: c.nome,
                    value: c.valor,
                    atividades: c.atividades
                };
            });
        }
        this.load();
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
                        this.etapas[etapa.id] = Object.assign(etapa, { numeroEtapa: index + 1 });
                    });
                }

                this.loading.hide();
            });
    }

    openModal(item: ExtratoItem) {
        const registro = item.registroFinanceiro;
        const empresa = item.registroFinanceiro ? item.registroFinanceiro.empresaFinanciadora : null;
        const recurso = item.registroFinanceiro ? (item.registroFinanceiro.recursoHumano || item.registroFinanceiro.recursoMaterial) : null;

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
            const categoriaContabil = this.categoriasContabeis[recurso.categoriaContabilValor]; //this.categoriasContabeis.find(c => c.value === recurso.categoriaContabilValor);
            registroItem.nome = registro.nomeItem;
            registroItem.categoria = categoriaContabil.text;
            registroItem.valor = registro.qtdItens * registro.valorUnitario;
        }

        const ref = this.modal.open(RegistroRefpDetailsComponent, { size: 'lg', backdrop: 'static' });

        ref.componentInstance.setRegistro(registroItem);

        ref.result.then(r => {
            this.load();
        }, e => {
            // Só cancelou nada a fazer
        });
    }
}
