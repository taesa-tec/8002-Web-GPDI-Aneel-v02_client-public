import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Produto, TiposProdutos, FasesCadeiaInovacao, Projeto} from '@app/models';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AppService} from '@app/core/services/app.service';
import {zip} from 'rxjs';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styles: []
})

export class ProdutoFormComponent implements OnInit {

    @Input() produto_id: number;

    inconsistencias: string[];
    produto: Produto;
    projeto: Projeto;
    tiposProdutos = TiposProdutos;
    // fases = FasesCadeiaInovacao;
    fases: Array<any>;
    form: FormGroup;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) {
    }

    get modalTitle() {
        return typeof this.produto.id !== 'undefined' ? 'Editar Produto' : 'Novo Produto';
    }

    get buttonAction() {
        return typeof this.produto.id !== 'undefined' ? {text: 'Salvar Alterações', icon: 'ta-save'} :
            {text: 'Criar Produto', icon: 'ta-plus-circle'};
    }

    get tiposDetalhados() {
        if (this.form) {
            const faseControl = this.form.get('catalogProdutoFaseCadeiaId');
            if (faseControl && faseControl.value) {
                const fase = this.fases.find(f => f.id === parseFloat(faseControl.value));
                return fase ? fase.tiposDetalhados : [];
            }
        }

        return [];
    }

    ngOnInit() {
        this.setup();
    }

    async setup() {
        this.fases = await this.app.catalogo.produtoFasesCadeia().toPromise();

        const classificacao = new FormControl(this.produto.classificacaoValor || '', [Validators.required]);
        const tipo = new FormControl(this.produto.tipoValor || '', [Validators.required]);
        const catalogProdutoFaseCadeiaId = new FormControl(this.produto.catalogProdutoFaseCadeiaId || '', [Validators.required]);
        const catalogProdutoTipoDetalhadoId = new FormControl(this.produto.catalogProdutoTipoDetalhadoId || '', [Validators.required]);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            classificacao,
            titulo: new FormControl(this.produto.titulo || '', [Validators.required]),
            desc: new FormControl(this.produto.desc || '', [Validators.required]),
            // <editor-fold desc="Somente para produto Final">
            tipo,
            catalogProdutoFaseCadeiaId,
            catalogProdutoTipoDetalhadoId
            // </editor-fold>
        });
        classificacao.valueChanges.subscribe(value => {
            if (value === 'Final') {
                this.form.addControl('tipo', tipo);
                this.form.addControl('catalogProdutoFaseCadeiaId', catalogProdutoFaseCadeiaId);
                this.form.addControl('catalogProdutoTipoDetalhadoId', catalogProdutoTipoDetalhadoId);
            } else {
                this.form.removeControl('tipo');
                this.form.removeControl('catalogProdutoFaseCadeiaId');
                this.form.removeControl('catalogProdutoTipoDetalhadoId');
            }
            this.form.updateValueAndValidity();

            console.log(tipo);
        });

        if (this.produto.id !== undefined) {
            this.form.addControl('id', new FormControl(this.produto.id));
        }
    }

    submit() {
        if (this.form.valid) {
            this.inconsistencias = [];
            const request = this.produto.id ? this.app.projetos.editarProduto(this.form.value) : this.app.projetos.criarProduto(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.activeModal.close(result);
                } else {
                    this.inconsistencias = result.inconsistencias;
                }
                this.loading.hide();
            });
        }
    }

    excluir() {
        this.app.confirm('Tem certeza que deseja excluir este produto?', 'Confirmar Exclusão').then(result => {
            if (result) {
                this.loading.show();
                this.app.projetos.delProduto(this.produto.id).subscribe(resultDelete => {
                    this.loading.hide();
                    if (resultDelete.sucesso) {
                        this.activeModal.close('deleted');
                    } else {
                        this.app.alert(resultDelete.inconsistencias.join(', '));
                    }
                });
            }

        });
    }

}
