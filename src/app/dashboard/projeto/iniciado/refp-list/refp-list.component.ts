import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/core/services/app.service';
import { ProjetoFacade } from '@app/facades/index';
import { Observable, zip, EMPTY, of, Subscription } from 'rxjs';
import { RegistroREFP, RecursoHumano, RecursoMaterial, Empresa, EmpresaProjeto, CategoriasContabeis } from '@app/models';
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';
import { RegistroRefpDetailsComponent } from '@app/dashboard/projeto/iniciado/registro-refp-details/registro-refp-details.component';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-refp-list',
    templateUrl: './refp-list.component.html',
    styles: []
})
export class RefpListComponent implements OnInit, OnDestroy {


    status = '...';
    projeto: ProjetoFacade;
    registros: Array<RegistroREFP>;
    recursosHumanos: Array<RecursoHumano>;
    recursosMateriais: Array<RecursoMaterial>;
    empresas: Array<EmpresaProjeto>;
    categorias: Array<any>;
    routerChangeSubscription: Subscription;

    tableRegistro: Array<{
        registro: RegistroREFP,
        nome: string;
        categoria: string;
        empresa: string;
        valor: number;
    }> = [];

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected route: ActivatedRoute, protected app: AppService, protected modal: NgbModal) {
    }

    ngOnInit() {
        this.load();
    }

    ngOnDestroy(): void {
        this.routerChangeSubscription.unsubscribe();
    }


    async load() {

        this.loading.show();
        this.projeto = await this.app.projetos.getCurrent();

        [this.recursosHumanos, this.recursosMateriais, this.empresas] = await Promise.all([
            this.projeto.relations.recursosHumanos.get().toPromise(),
            this.projeto.relations.recursosMateriais.get().toPromise(),
            this.projeto.relations.empresas.get().toPromise()
        ]);


        const categorias$ = this.projeto.isPD ? of(CategoriasContabeis) : this.app.catalogo.categoriasContabeisGestao().pipe(map(cats => cats.map(c => {
            return {
                text: c.nome,
                value: c.id,
                atividades: c.atividades
            };
        })));

        this.categorias = await categorias$.toPromise();


        this.routerChangeSubscription = this.route.paramMap.subscribe(paramsMap => {
            this.status = paramsMap.get('status');
            this.loadRegistros();
        });
        this.loading.hide();
    }

    protected async loadRegistros() {
        let req: Observable<RegistroREFP[]>;
        switch (this.status) {
            case 'pendentes':
                req = this.projeto.relations.REFP.registrosPendentes();
                break;
            case 'reprovados':
                req = this.projeto.relations.REFP.registrosReprovados();
                break;
            case 'aprovados':
                req = this.projeto.relations.REFP.registrosAprovados();
                break;
        }

        this.registros = await req.toPromise();

        this.fillTable();

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

            if (registro.tipoValor === 'RH') {
                const recurso = this.recursosHumanos.find(r => r.id === registro.recursoHumanoId);
                if (recurso) {
                    registroItem.nome = recurso.nomeCompleto;
                    registroItem.categoria = 'Recursos Humanos';
                    registroItem.valor = recurso.valorHora * registro.qtdHrs;
                } else {
                    registroItem.nome = 'Não encontrado';
                }

            } else {
                const recurso = this.recursosMateriais.find(r => r.id === registro.recursoMaterialId);
                const categoriaContabil = this.categorias.find(c => String(c.value) === String(this.projeto.isPD ? registro.categoriaContabilValor : recurso.categoriaContabilGestao.id));
                registroItem.nome = registro.nomeItem;
                registroItem.categoria = categoriaContabil ? categoriaContabil.text : '';
                registroItem.valor = registro.qtdItens * registro.valorUnitario;
            }

            return registroItem;
        });
    }

    async openDetails(registro) {
        const ref = this.modal.open(RegistroRefpDetailsComponent, { size: 'lg', backdrop: 'static' });
        ref.componentInstance.setRegistro(registro);
        try {
            await ref.result;
            this.loadRegistros();
        } catch (e) {

        }

    }

}
