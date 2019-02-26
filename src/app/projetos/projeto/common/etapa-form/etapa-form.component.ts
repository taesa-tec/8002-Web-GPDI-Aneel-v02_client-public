import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Produto, EtapaProduto, Projeto, EditEtapaRequest, CriarEtapaRequest } from '@app/models';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { zip, timer } from 'rxjs';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-etapa-form',
    templateUrl: './etapa-form.component.html',
    styles: []
})
export class EtapaFormComponent implements OnInit {

    etapa: any;
    projeto: Projeto;
    form: FormGroup;
    produtos: Produto[] = [];
    produtosGroup: FormArray = new FormArray([]);

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService, protected app: AppService) { }

    get btnTxt() {
        return this.etapa.id ? "Salvar Etapa" : "Adicionar Etapa";
    }

    ngOnInit() {
        const produtos$ = this.projetoService.getProdutos(this.projeto.id);
        this.setup();
        zip(produtos$).subscribe(([produtos]) => {
            this.produtos = produtos;
        });
    }

    filtrarProdutos(atual = null) {
        const pid = atual ? parseInt(atual.value.ProdutoId, 10) : 0;
        const list = (this.produtosGroup.value as Array<{ ProdutoId: any }>).map(p => parseInt(p.ProdutoId, 10));
        return this.produtos.filter(p => (list.indexOf(p.id) === -1 || p.id === pid));
    }

    setup() {
        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id),
            desc: new FormControl(this.etapa.desc || '', [Validators.required]),
            EtapaProdutos: this.produtosGroup
        });

        if (this.etapa.id) {
            this.form.addControl('id', new FormControl(this.etapa.id));
        }
        if (this.etapa.etapaProdutos) {
            (this.etapa.etapaProdutos as Array<EtapaProduto>).map(ep => {
                this.produtosGroup.push(new FormGroup({ ProdutoId: new FormControl(ep.produtoId, Validators.required) }));
            });
        }
    }

    adicionarProduto(id: number) {
        this.produtosGroup.push(new FormGroup({ ProdutoId: new FormControl('', Validators.required) }));
    }

    removerProduto(index) {
        this.produtosGroup.removeAt(index);
    }

    submit() {
        if (this.form.valid) {
            const v = this.form.value;
            const request = this.etapa.id ? this.projetoService.editarEtapa(v) : this.projetoService.criarEtapa(v);

            this.loading.show();

            request.subscribe(r => {
                if (r.sucesso) {
                    this.activeModal.close(r);
                } else {
                    this.app.alert(r.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }

    excluirEtapa() {
        this.app.confirm("Tem certeza que deseja excluir esta etapa?", "Confirmar Exclusão")
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delEtapa(this.etapa.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            this.activeModal.close('deleted');
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.app.alert(error.message);
                    });
                }

            });
    }

}
