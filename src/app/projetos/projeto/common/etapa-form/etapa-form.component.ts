import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto, EtapaProduto, Projeto, EditEtapaRequest, CriarEtapaRequest, TextValue, Etapa } from '@app/models';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/facades';
import * as moment from 'moment';



@Component({
    selector: 'app-etapa-form',
    templateUrl: './etapa-form.component.html',
    styles: []
})
export class EtapaFormComponent implements OnInit {

    etapa: Etapa;
    projeto: ProjetoFacade;
    form: FormGroup;
    produtos: Produto[] = [];
    produtosGroup: FormArray = new FormArray([]);
    mesesGroup: FormArray = new FormArray([]);
    meses: Array<TextValue> = [];

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) { }

    get btnTxt() {
        return this.etapa.id ? "Salvar Etapa" : "Adicionar Etapa";
    }
    get tituloTxt() {
        return this.etapa.id ? "Editar Etapa" : "Nova Etapa";
    }

    ngOnInit() {

        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            if (this.projeto.isPD) {
                const produtos$ = this.projeto.REST.Produtos.listar<Array<Produto>>();
                zip(produtos$).subscribe(([produtos]) => {
                    this.produtos = produtos;
                    this.setup();
                });
            } else {
                this.setup();
            }
        })


    }
    setup() {
        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id),
            desc: new FormControl(this.etapa.desc || '', [Validators.required]),

        });

        if (this.etapa.id) {
            this.form.addControl('id', new FormControl(this.etapa.id));
        }

        if (this.projeto.isPD) {
            this.form.addControl('EtapaProdutos', this.produtosGroup);
            if (this.etapa.etapaProdutos) {
                (this.etapa.etapaProdutos as Array<EtapaProduto>).map(ep => {
                    this.produtosGroup.push(new FormGroup({ ProdutoId: new FormControl(ep.produtoId, Validators.required) }));
                });
            }
        }

        if (this.projeto.isPG) {
            this.fillMonths();
            this.form.addControl('EtapaMeses', this.mesesGroup);
            if (this.etapa.etapaMeses) {
                this.etapa.etapaMeses.forEach(mes => {
                    this.adicionarMes(moment(mes.mes).format('YYYY-MM-DD'));
                });
            }
        }

    }
    fillMonths() {
        if (this.projeto.isPD) {
            return;
        }

        const start = moment(this.projeto.dataInicio);
        const end = moment(this.projeto.dataInicio).add(24, 'months');
        while (start.isBefore(end)) {

            const ano = start.format('YYYY');
            const mes = start.format('MMMM'); // .padEnd(9, '*').replace(/\*/g, '&nbsp;');

            this.meses.push({
                text: `${mes} - ${ano}`,
                value: start.format('YYYY-MM-DD')
            });
            start.add(1, 'month');
        }
    }
    filtrarProdutos(atual = null) {
        const pid = atual ? parseInt(atual.value.ProdutoId, 10) : 0;
        const list = (this.produtosGroup.value as Array<{ ProdutoId: any }>).map(p => parseInt(p.ProdutoId, 10));
        return this.produtos.filter(p => (list.indexOf(p.id) === -1 || p.id === pid));
    }

    adicionarProduto(id: number) {
        this.produtosGroup.push(new FormGroup({ ProdutoId: new FormControl('', Validators.required) }));
    }

    removerProduto(index) {
        this.produtosGroup.removeAt(index);
    }

    filtrarMeses(atual = null) {
        const mes = atual ? atual.value.mes : '';
        const list = (this.mesesGroup.value as Array<{ mes: any }>).map(p => p.mes);
        return this.meses.filter(m => (list.indexOf(m.value) === -1 || m.value === mes));
    }
    adicionarMes(mes = '') {
        this.mesesGroup.push(new FormGroup({ mes: new FormControl(mes, Validators.required) }));
    }

    removerMes(index) {
        this.mesesGroup.removeAt(index);
    }

    submit() {
        if (this.form.valid) {
            const v = this.form.value;
            const request = this.etapa.id ? this.projeto.REST.Etapas.editar(v) : this.projeto.REST.Etapas.criar(v);

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
                        this.loading.hide();
                        this.app.alert(error.message);
                    });
                }

            });
    }

}
