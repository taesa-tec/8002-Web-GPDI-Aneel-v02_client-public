import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Produto, EtapaProduto, Projeto, EditEtapaRequest, CriarEtapaRequest, Etapa } from '@app/models';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { zip, timer } from 'rxjs';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/facades';


@Component({
    selector: 'app-etapa-atividades-form',
    templateUrl: './etapa-atividades-form.component.html',
    styles: []
})
export class EtapaAtividadesFormComponent implements OnInit {
    etapa: Etapa;
    projeto: ProjetoFacade;
    form: FormGroup;
    produtos: Produto[] = [];
    produtosGroup: FormArray = new FormArray([]);

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) { }

    get btnTxt() {
        return "Salvar Etapa";
    }
    get tituloTxt() {
        return "Editar Etapa";
    }

    get etapaProdutos() {
        if (this.etapa) {
            return this.etapa.etapaProdutos.map(
                ep => this.produtos.find(p => ep.produtoId === p.id)
            ).filter(p => p !== undefined);

        }
        return [];
    }

    ngOnInit() {

        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            const produtos$ = this.projeto.REST.Produtos.listar<Array<Produto>>();
            zip(produtos$).subscribe(([produtos]) => {
                this.produtos = produtos;
                this.setup();
            });
        })


    }

    filtrarProdutos(atual = null) {
        const pid = atual ? parseInt(atual.value.ProdutoId, 10) : 0;
        const list = (this.produtosGroup.value as Array<{ ProdutoId: any }>).map(p => parseInt(p.ProdutoId, 10));
        return this.produtos.filter(p => (list.indexOf(p.id) === -1 || p.id === pid));
    }

    setEtapa(etapa: Etapa) {
        this.etapa = etapa;
    }

    setup() {
        this.form = new FormGroup({
            id: new FormControl(this.etapa.id),
            desc: new FormControl(this.etapa.desc || '', [Validators.required]),
            etapaProdutos: new FormControl(this.etapa.etapaProdutos || [], [Validators.required]),
            atividadesRealizadas: new FormControl(this.etapa.atividadesRealizadas || '', Validators.required)
        });
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

            this.loading.show();

            this.projeto.REST.Etapas.editar(v).subscribe(r => {
                if (r.sucesso) {
                    this.activeModal.close(r);
                    this.app.alert("Salvo com sucesso");
                } else {
                    this.app.alert(r.inconsistencias.join(', '));
                }
                this.loading.hide();
            }, error => {
                this.loading.hide();
                this.app.alert(error.message, error.statusText);

            });
        }
    }


}
