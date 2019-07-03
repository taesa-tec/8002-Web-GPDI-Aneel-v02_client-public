import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Produto, EtapaProduto, Projeto, EditEtapaRequest, CriarEtapaRequest, Etapa} from '@app/models';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {zip, timer} from 'rxjs';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {ProjetoFacade} from '@app/facades/index';
import {LoggerDirective} from '@app/logger/logger.directive';


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
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) {
    }

    get btnTxt() {
        return 'Salvar Etapa';
    }

    get tituloTxt() {
        return 'Editar Etapa';
    }

    get etapaProdutos() {
        if (this.etapa) {
            return this.etapa.etapaProdutos.map(
                ep => this.produtos.find(p => ep.produtoId === p.id)
            ).filter(p => p !== undefined);

        }
        return [];
    }

    async ngOnInit() {

        this.projeto = await this.app.projetos.getCurrent();
        this.produtos = await this.projeto.REST.Produtos.listar<Array<Produto>>().toPromise();
        this.setup();


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
            etapaProdutos: new FormControl(this.etapa.etapaProdutos || []),
            atividadesRealizadas: new FormControl(this.etapa.atividadesRealizadas || '')
        });
    }

    adicionarProduto(id: number) {
        this.produtosGroup.push(new FormGroup({ProdutoId: new FormControl('', Validators.required)}));
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
                    this.app.alert('Salvo com sucesso');
                    this.logger.saveUpdate();
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
