import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EtapaFormComponent } from '@app/projetos/projeto/common/etapa-form/etapa-form.component';
import { AppService } from '@app/app.service';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Projeto, Etapa } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-etapas',
    templateUrl: './etapas.component.html',
    styles: []
})
export class EtapasComponent implements OnInit {

    projeto: ProjetoFacade;
    etapas: Array<Etapa> = [];
    form: FormGroup;
    dataInicio = new Date();

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'id',
        direction: 'asc'
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get ano() {
        return this.dataInicio.getFullYear();
    }
    set ano(value) {
        this.dataInicio.setFullYear(value);
        this.setControlData();
    }

    get mes() {
        return this.dataInicio.getMonth();
    }
    set mes(value) {
        this.dataInicio.setMonth(value);
        this.setControlData();
    }

    constructor(private app: AppService) { }

    protected setControlData() {
        const d = new Date(this.ano, this.mes, 1);
        const v = (new DatePipe('en-US')).transform(d, 'yyyy-MM-dd');
        this.form.get('dataInicio').setValue(v);
    }


    ngOnInit() {
        const projeto$ = this.app.projetos.projetoLoaded;

        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;

            const dataInicio = this.projeto.dataInicio ? new Date(this.projeto.dataInicio) : new Date();

            this.form = new FormGroup({
                id: new FormControl(this.projeto.id),
                dataInicio: new FormControl('')
            });

            this.mes = dataInicio.getMonth();
            this.ano = dataInicio.getFullYear();

            this.loadEtapas();
        });
    }

    loadEtapas() {
        this.projeto.REST.Etapas.listar<Array<Etapa>>().subscribe(etapas => {
            if (etapas) {
                this.etapas = etapas.map((etapa, i) => { etapa.numeroEtapa = i + 1; return etapa; })
            }
        });
    }

    openModal(etapa: any = {}) {
        const modalRef = this.app.modal.open(EtapaFormComponent, { size: 'lg' });
        modalRef.componentInstance.etapa = etapa;
        modalRef.componentInstance.projeto = this.projeto;
        modalRef.result.then(r => {
            this.loadEtapas();
        }, e => {

        });
    }

    excluir(id: number) {
        this.app.confirm(`Tem certeza quer deseja excluir esta etapa?
         Todos os produtos intermediários associados a ela perdrão sua associação.`
            , "Excluir Etapa").then(response => {
                if (response) {
                    this.app.alert("Etapa Excluída");
                }
            });
    }

    setDataInicio() {
        this.loading.show();
        this.app.projetos.editarDataInicio(this.form.value).subscribe(result => {
            this.loading.hide();
            this.loadEtapas();
        });
    }

}
