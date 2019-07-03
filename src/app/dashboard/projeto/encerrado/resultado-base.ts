import {OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {ProjetoFacade, ProjetoREST} from '@app/facades/index';
import {Observable} from 'rxjs';
import {EditorResultado} from '../common/editors/editor-resultado-base';
import {Projeto} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

export abstract class ResultadoBase<T> implements OnInit {

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    projeto: ProjetoFacade;
    projetoREST: ProjetoREST;
    resultados: Array<T> = [];

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'id',
        direction: 'asc'
    };

    constructor(protected app: AppService, protected modal: NgbModal, protected restService: string, protected editor?: any) {
    }

    ngOnInit(): void {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            try {
                this.projeto = projeto;
                this.projetoREST = this.projeto.REST[this.restService];
                this.load();
            } catch (e) {
                console.log('REST não encontrada no projeto');
            }

        });
    }

    protected showLoading() {
        try {
            this.loading.show();
        } catch (e) {
            console.warn(e);
        }
    }

    protected hideLoading() {
        try {
            this.loading.hide();
        } catch (e) {
            console.warn(e);
        }
    }

    load() {
        this.showLoading();
        this.projetoREST.listar<Array<T>>().subscribe(resultados => {
            this.resultados = resultados;
            this.hideLoading();
        }, error => {
            this.hideLoading();
            console.error(error);
        });
    }

    criar() {
        this.editar();
    }

    editar(relatorio?: T) {
        if (this.editor) {
            const ref = this.modal.open(this.editor, {size: 'lg', backdrop: 'static'});
            try {
                (<EditorResultado<any>>ref.componentInstance).setEditable(relatorio, this);
            } catch (e) {
                console.log(e);

            }
            ref.result.then(updated => {
                if (updated) {
                    this.load();
                }
            }, error => {
                // Só fechou o modal -.-
            });
            return ref;
        } else {
            throw new Error('Editor não configurado ou encontrado');
        }
    }


}
