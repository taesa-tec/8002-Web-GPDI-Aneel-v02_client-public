import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Produto, EtapaProduto } from '@app/models';

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

    @ViewChild('loading') loading: LoadingComponent;
    @ViewChild('xmlLoading') xmlLoading: LoadingComponent;

    constructor(protected app: AppService) { }

    get dataFimControl() {
        return this.form.get('dataFim');
    }

    get ano() {
        return this.dataFim.getFullYear();
    }
    set ano(value) {
        this.dataFim.setFullYear(value);
        this.setControlData();
    }

    get mes() {
        return this.dataFim.getMonth();
    }
    set mes(value) {
        this.dataFim.setMonth(value);
        this.setControlData();
    }

    protected setControlData() {
        const d = new Date(this.ano, this.mes, 1);
        const v = (new DatePipe('en-US')).transform(d, 'yyyy-MM-dd');
        if (this.dataFimControl) {
            this.dataFimControl.setValue(v);
        }
    }

    ngOnInit() {

        this.loading.show()
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.projeto.relations.produtos.get().subscribe(p => {
                this.produtos = p;
                this.setup();
                this.loading.hide();
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
        this.setControlData();
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
            this.app.alert(error.message);
            this.loading.hide();
        });
    }


}
