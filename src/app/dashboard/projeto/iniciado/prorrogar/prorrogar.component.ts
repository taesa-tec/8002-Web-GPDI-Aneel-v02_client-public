import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjetoFacade} from '@app/facades/index';
import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import {Produto, EtapaProduto, TextValue, Etapa} from '@app/models';
import {zip, timer} from 'rxjs';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

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
    formXml = new FormGroup({xmlProjetoProrrogacao: this.xmlProjetoProrrogacao});
    mesesRef: Array<TextValue> = [];
    etapas: Array<Etapa>;
    canExtend = false;
    canExtendMessage = '';

    @ViewChild('loading') loading: LoadingComponent;
    @ViewChild('xmlLoading') xmlLoading: LoadingComponent;

    constructor(protected app: AppService, private route: ActivatedRoute) {
    }

    async ngOnInit() {

        this.loading.show();
        this.projeto = await this.app.projetos.getCurrent();

        if (this.projeto.isPD) {
            this.projeto.REST.Etapas.clearCache();
            const etapas = await this.projeto.REST.Etapas.listar<Array<Etapa>>().toPromise();
            const produtos = await this.projeto.REST.Produtos.listar<Array<Produto>>().toPromise();


            try {
                if (produtos == null) {
                    throw new Error('Não há produtos cadastrados');
                }

                this.produtos = produtos;

                if (etapas) {
                    this.etapas = [...etapas];
                    const etapaFirst = etapas.shift();
                    const etapaLast = this.etapas.length > 1 ? etapas.pop() : etapaFirst;

                    if (etapaLast.dataFim == null || etapaFirst.dataInicio == null) {
                        throw new Error('Etapas sem datas definidas, certifique-se se a data inicial do projeto foi definida');
                    }

                    const start = moment(etapaLast.dataFim).add(1, 'months'); // O ínício da prorrogação é a ultima etapa + 1 mês
                    const end = moment(etapaFirst.dataInicio).add(60, 'months'); // O máximo é do ínicio do projeto + 60 meses
                    while (start.isBefore(end)) {
                        const ano = start.format('YYYY');
                        const mes = start.format('MMMM'); // .padEnd(9, '*').replace(/\*/g, '&nbsp;');
                        this.mesesRef.push({
                            text: `${mes} - ${ano}`,
                            value: start.format('YYYY-MM-DD')
                        });

                        start.add(1, 'months');
                    }
                    this.canExtend = true;
                } else {
                    throw new Error('Não há etapas cadastradas');
                }
            } catch (e) {
                this.canExtendMessage = e.message;
                this.app.alert(['Não é possível prorrogar o projeto atual.', e.message], 'Erro');
            }
            this.loading.hide();
            this.setup();

        } else {
            this.loading.hide();
            timer(10).subscribe(t => {
                this.app.router.navigate(['../recursos-humanos'], {relativeTo: this.route});
            });
        }


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
        this.produtosGroup.push(new FormGroup({produtoId: new FormControl('', Validators.required)}));
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
                this.app.alert('Projeto prorrogado com sucesso!');
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
            this.app.alert(error.message, 'Erro na requisição');
            this.loading.hide();
        });
    }


}
