import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { Observable, zip, EMPTY } from 'rxjs';
import { RegistroREFP, RecursoHumano, RecursoMaterial, Empresa, EmpresaProjeto, CategoriasContabeis } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { RegistroRefpDetailsComponent } from '@app/projetos/projeto/iniciado/registro-refp-details/registro-refp-details.component';

@Component({
    selector: 'app-refp-list',
    templateUrl: './refp-list.component.html',
    styles: []
})
export class RefpListComponent implements OnInit {


    status = '...';
    projeto: ProjetoFacade;
    registros: Array<RegistroREFP>;
    recursosHumanos: Array<RecursoHumano>;
    recursosMateriais: Array<RecursoMaterial>;
    empresas: Array<EmpresaProjeto>;

    tableRegistro: Array<{
        registro: RegistroREFP,
        nome: string;
        categoria: string;
        empresa: string;
        valor: number;
    }> = [];

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected route: ActivatedRoute, protected app: AppService) { }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            const recursosHumanos$ = projeto.relations.recursosHumanos.get();
            const recursosMateriais$ = projeto.relations.recursosMateriais.get();
            const empresas$ = projeto.relations.empresas.get();
            this.projeto = projeto;
            this.loading.show();

            zip(recursosHumanos$, recursosMateriais$, empresas$)
                .subscribe(([recursosHumanos, recursosMateriais, empresas]) => {

                    this.recursosHumanos = recursosHumanos;
                    this.recursosMateriais = recursosMateriais;
                    this.empresas = empresas;

                    this.route.paramMap.subscribe(paramsMap => {
                        this.status = paramsMap.get('status');
                        this.load();
                    });
                });
        });
    }

    protected loadRegistros() {
        switch (this.status) {
            case "pendentes":
                return this.projeto.relations.REFP.registrosPendentes();
            case "reprovados":
                return this.projeto.relations.REFP.registrosReprovados();
            case "aprovados":
                return this.projeto.relations.REFP.registrosAprovados();
        }
        return EMPTY;
    }

    load() {
        this.loading.show();
        this.tableRegistro = [];
        this.loadRegistros().subscribe(registros => {
            this.registros = registros;
            this.fillTable();
            this.loading.hide();
        });
    }

    fillTable() {
        this.tableRegistro = this.registros.map(registro => {
            let empresa: any = this.empresas.find(e => e.id === registro.empresaFinanciadoraId);
            empresa = empresa.catalogEmpresa ? empresa.catalogEmpresa.nome : empresa.razaoSocial;

            const registroItem = {
                registro,
                nome: '',
                categoria: '',
                empresa,
                valor: 0,
                tipo: registro.tipoValor
            };

            if (registro.tipoValor === "RH") {
                const recurso = this.recursosHumanos.find(r => r.id === registro.recursoHumanoId);
                if (recurso) {
                    registroItem.nome = recurso.nomeCompleto;
                    registroItem.categoria = "Recursos Humanos";
                    registroItem.valor = recurso.valorHora * registro.qtdHrs;
                } else {
                    registroItem.nome = "Não encontrado";
                }

            } else {
                const recurso = this.recursosMateriais.find(r => r.id === registro.recursoMaterialId);
                const categoriaContabil = CategoriasContabeis.find(c => c.value === recurso.categoriaContabilValor);
                registroItem.nome = registro.nomeItem;
                registroItem.categoria = categoriaContabil.text;
                registroItem.valor = registro.qtdItens * registro.valorUnitario;
            }

            return registroItem;
        });
    }

    openDetails(registro) {
        const ref = this.app.modal.open(RegistroRefpDetailsComponent, { size: 'lg', backdrop: 'static' });
        ref.componentInstance.setRegistro(registro);
        ref.result.then(r => {
            this.load();
        }, e => {
            // Só cancelou nada a fazer
        });
    }

}
