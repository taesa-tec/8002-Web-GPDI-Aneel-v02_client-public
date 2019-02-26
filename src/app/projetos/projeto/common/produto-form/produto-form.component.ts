import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Produto, TiposProdutos, FasesCadeiaInovacao, Projeto } from '@app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { AppService } from '@app/app.service';

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
    fases = FasesCadeiaInovacao;
    form: FormGroup;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) { }

    get modalTitle() {
        return typeof this.produto.id !== 'undefined' ? "Editar Produto" : "Novo Produto";
    }
    get buttonAction() {
        return typeof this.produto.id !== 'undefined' ? { text: "Salvar Alterações", icon: 'ta-save' } :
            { text: "Criar Produto", icon: 'ta-plus-circle' };
    }

    ngOnInit() {
        this.setup();
    }

    setup() {
        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            titulo: new FormControl(this.produto.titulo || '', [Validators.required]),
            desc: new FormControl(this.produto.desc || '', [Validators.required]),
            classificacao: new FormControl(this.produto.classificacaoValor || '', [Validators.required]),
            tipo: new FormControl(this.produto.tipoValor || '', [Validators.required]),
            faseCadeia: new FormControl(this.produto.faseCadeiaValor || '', [Validators.required])
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
        this.app.confirm("Tem certeza que deseja excluir este produto?", "Confirmar Exclusão").then(result => {
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
