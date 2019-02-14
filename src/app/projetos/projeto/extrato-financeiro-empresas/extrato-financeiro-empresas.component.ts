import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { AppService } from '@app/app.service';
import { Projeto, ExtratosEmpresas, Etapa, TextValue, CategoriaContabil, ExtratoItem } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { RecursoMaterialFormComponent } from '@app/projetos/recurso-material-form/recurso-material-form.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-extrato-financeiro-empresas',
    templateUrl: './extrato-financeiro-empresas.component.html',
    styles: []
})
export class ExtratoFinanceiroEmpresasComponent implements OnInit {

    projeto: Projeto;
    extrato: ExtratosEmpresas;
    etapas: { [propName: number]: Etapa } = {};
    categoriasContabeis: { [propName: string]: TextValue } = {};

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get extratoEmpresas() {
        return this.extrato ? this.extrato.empresas.filter(e => e.total > 0) : [];
    }
    get totalGeral() {
        return this.extrato ? this.extrato.valor : 0;
    }



    constructor(
        protected app: AppService,
        private route: ActivatedRoute
    ) {
        CategoriaContabil.forEach(c => {
            this.categoriasContabeis[c.value] = c;
        });
    }
    categoriaPorCod(cod) {
        if (this.categoriasContabeis[cod]) {
            return this.categoriasContabeis[cod].text;
        }
        return '';
    }

    openModal(item: ExtratoItem) {
        let modal: NgbModalRef;

        if (item.recursoHumano) {
            modal = this.app.modal.open(RecursoHumanoFormComponent, { size: 'lg' });
            modal.componentInstance.recursoHumano = item.recursoHumano;
        } else if (item.recursoMaterial) {
            modal = this.app.modal.open(RecursoMaterialFormComponent, { size: 'lg' });
            modal.componentInstance.recursoMaterial = item.recursoMaterial;
        }


        if (modal) {
            modal.componentInstance.projeto = this.projeto;
            modal.result.then(result => {
                console.log(result);
            }, error => {
                
            });
        }
    }

    ngOnInit() {
        const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));
        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.load();
        });
    }

    load() {
        this.loading.show();
        const extratos$ = this.app.projetos.getExtratoEmpresas(this.projeto.id);
        const etapas$ = this.app.projetos.getEtapas(this.projeto.id);

        zip(extratos$, etapas$).subscribe(([extrato, etapas]) => {
            this.extrato = extrato;
            etapas.forEach((etapa, index) => {
                this.etapas[etapa.id] = Object.assign(etapa, { numeroEtapa: index + 1 });
            });
            this.loading.hide();
        });
    }

}
