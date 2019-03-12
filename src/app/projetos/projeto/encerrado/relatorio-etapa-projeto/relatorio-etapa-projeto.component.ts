import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { Etapa } from '@app/models';
import { EtapaAtividadesFormComponent } from '../../common/etapa-atividades-form/etapa-atividades-form.component';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-relatorio-etapa-projeto',
    templateUrl: './relatorio-etapa-projeto.component.html',
    styleUrls: []
})
export class RelatorioEtapaProjetoComponent implements OnInit {

    projeto: ProjetoFacade;
    etapas: Array<Etapa>;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.obterRelatoriosEtapas();
            // this.projeto.relations.
        });
    }

    obterRelatoriosEtapas() {
        this.loading.show();
        this.projeto.REST.Etapas.listar<Array<Etapa>>().subscribe(etapas => {
            this.loading.hide();
            this.etapas = etapas;
            console.log(etapas);

        }, err => this.loading.hide());
    }

    editar(etapa: Etapa) {
        const ref = this.app.modal.open(EtapaAtividadesFormComponent, { size: 'lg' });
        const etapaAtividadeForm = <EtapaAtividadesFormComponent>ref.componentInstance;
        etapaAtividadeForm.setEtapa(etapa);
        ref.result.then(result => {
            if (result) {
                this.obterRelatoriosEtapas();
            }
        }, e => {

        });
    }

}
