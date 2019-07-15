import {Component, OnInit, ViewChild} from '@angular/core';
import {AlocarRecursoMaterialFormComponent} from '@app/dashboard/projeto/common/recursos-materiais/alocar-recurso-material-form/alocar-recurso-material-form.component';
import {mergeMap} from 'rxjs/operators';
import {AlocacaoRM, CategoriasContabeis} from '@app/models';
import {zip, of} from 'rxjs';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {EmpresaProjetoFacade, ProjetoFacade} from '@app/facades/index';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: []
})
export class AlocacaoComponent implements OnInit {

    categoriaContabel = CategoriasContabeis;
    alocacoes: Array<any>;
    projeto: ProjetoFacade;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'recursoMaterial.nome',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, protected modal: NgbModal) {
    }

    ngOnInit() {
        this.loadData();
    }

    async loadData() {

        console.log('Chamado');
        this.loading.show();

        this.projeto = await this.app.projetos.getCurrent();

        this.projeto.REST.AlocacaoRms.clearCache();

        const alocacoes = await this.projeto.REST.AlocacaoRms.listar<Array<AlocacaoRM>>().toPromise();
        const categoriasContabeisGestao = await this.app.catalogo.categoriasContabeisGestao().toPromise();

        if (this.projeto.isPG) {
            this.categoriaContabel = categoriasContabeisGestao.map(cat => {
                return {text: cat.nome, value: String(cat.id), atividades: cat.atividades};
            });
        }

        this.alocacoes = alocacoes.map(aloc => {
            aloc.empresaFinanciadora = new EmpresaProjetoFacade(aloc.empresaFinanciadora);
            aloc.empresaRecebedora = this.projeto.isPD ? new EmpresaProjetoFacade(aloc.empresaRecebedora) : aloc.empresaFinanciadora;
            if (aloc.recursoMaterial) {
                try {
                    if (this.projeto.isPD) {
                        aloc.categoriaContabelNome = this.categoriaContabel.find(e => aloc.recursoMaterial.categoriaContabilValor === e.value).text;
                    } else {
                        aloc.categoriaContabelNome = this.categoriaContabel.find(e => String(aloc.recursoMaterial.catalogCategoriaContabilGestaoId) === e.value).text;
                    }
                } catch (err) {
                    aloc.categoriaContabelNome = 'Não encontrado';
                }
            }

            aloc.valorTotal = aloc.qtd * aloc.recursoMaterial.valorUnitario;

            return aloc;
        });

        this.loading.hide();

    }

    openModal(alocacao: AlocacaoRM | {} = {}) {
        const modalRef = this.modal.open(AlocarRecursoMaterialFormComponent, {size: 'lg'});
        modalRef.componentInstance.alocacao = alocacao;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();

        }, e => {

        });

    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

}
