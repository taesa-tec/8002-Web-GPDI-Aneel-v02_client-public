import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/facades';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Produto, EtapaProduto, TextValue, Etapa } from '@app/models';
import { zip } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-prorrogar',
    templateUrl: './prorrogar.component.html',
    styles: []
})
export class ProrrogarComponent implements OnInit {
    projeto: ProjetoFacade;
    dataFim = new Date();
    xmlProjetoProrrogacao: FormControl = new FormControl('', [Validators.required]);
    form: FormGroup;
    produtos: Produto[] = [];
    produtosGroup: FormArray = new FormArray([]);
    etapaGroup: FormGroup;
    formXml = new FormGroup({ xmlProjetoProrrogacao: this.xmlProjetoProrrogacao });
    mesesRef: Array<TextValue> = [];

    @ViewChild('loading') loading: LoadingComponent;
    @ViewChild('xmlLoading') xmlLoading: LoadingComponent;

    constructor(protected app: AppService) { }

    ngOnInit() {

        this.loading.show()
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            const etapas$ = this.projeto.REST.Etapas.listar<Array<Etapa>>();
            const produtos$ = this.projeto.REST.Produtos.listar<Array<Produto>>();
            zip(etapas$, produtos$).subscribe(([etapas, produtos]) => {


                const etapaFirst = etapas.shift();
                const etapaLast = etapas.pop();

                console.log({ etapaFirst, etapas, etapaLast });
                const start = moment(etapaLast.dataFim).add(1, 'months');
                const end = moment(etapaFirst.dataInicio).add(60, 'months');


                while (start.isBefore(end)) {

                    const ano = start.format('YYYY');
                    const mes = start.format('MMMM'); // .padEnd(9, '*').replace(/\*/g, '&nbsp;');

                    this.mesesRef.push({
                        text: `${mes} - ${ano}`,
                        value: start.format('YYYY-MM-DD')
                    });
                    start.add(1, 'months');
                    // if (this.mesesRef.length > 10) {
                    //     break;
                    // }

                }
                this.produtos = produtos;
                this.loading.hide();
                this.setup();
            });


        });
    }

    filtrarProdutos(atual = null) {
        const pid = atual ? parseInt(atual.value.ProdutoId, 10) : 0;
        const list = (this.produtosGroup.value as Array<{ ProdutoId: any }>).map(p => parseInt(p.ProdutoId, 10));
        return this.produtos.filter(p => (list.indexOf(p.id) === -1 || p.id === pid));
    }

    setup() {
        this.etapaGroup = new FormGroup({
            desc: new FormControl('', Validators.required),
            etapaProdutos: this.produtosGroup
        });
        this.form = new FormGroup({
            id: new FormControl(this.projeto.id),
            dataFim: new FormControl('', [Validators.required]),
            etapa: this.etapaGroup
        });
    }

    adicionarProduto(id: number) {
        this.produtosGroup.push(new FormGroup({ produtoId: new FormControl('', Validators.required) }));
    }

    removerProduto(index) {
        this.produtosGroup.removeAt(index);
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        this.loading.show();
        this.projeto.prorrogar(this.form.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.alert("Projeto prorrogado com sucesso!");
            } else {
                this.app.alert(result.inconsistencias);
            }
        }, error => {
            this.loading.hide();
        });

    }

    gerarXmlProrrogacao() {
        this.loading.show();
        this.app.projetos.gerarXmlProrrogacao(this.projeto.id, this.xmlProjetoProrrogacao.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.projeto.downloadXml(result.id);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        }, (error: HttpErrorResponse) => {
            this.app.alert(error.message, "Erro na requisição");
            this.loading.hide();
        });
    }


}
