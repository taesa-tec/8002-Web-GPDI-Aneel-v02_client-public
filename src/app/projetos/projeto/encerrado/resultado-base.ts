import { OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ProjetoFacade, ProjetoREST } from '@app/facades';
import { Observable } from 'rxjs';
import { EditorResultado } from '../common/editors/editor-resultado-base';

export abstract class ResultadoBase<T> implements OnInit {

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    projeto: ProjetoFacade;
    projetoREST: ProjetoREST;
    resultados: Array<T> = [];

    constructor(protected app: AppService, protected restService: string, protected editor?: any) { }



    ngOnInit(): void {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            try {
                this.projeto = projeto;
                this.projetoREST = this.projeto.REST[this.restService];
                this.load();
            } catch (e) {
                console.log("REST não encontrada no projeto");
            }

        })
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

    criar() { this.editar(); }

    editar(relatorio?: T) {
        if (this.editor) {
            const ref = this.app.modal.open(this.editor, { size: 'lg' });
            try {
                (<EditorResultado<any>>ref.componentInstance).setEditable(relatorio);
            } catch (e) {
                console.log(e);

            }
        } else {
            throw new Error('Editor não configurado ou encontrado');
        }
    }


}
