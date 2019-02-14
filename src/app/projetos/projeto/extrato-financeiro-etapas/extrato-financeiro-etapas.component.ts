import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { AppService } from '@app/app.service';
import { Projeto, Etapa, TextValue, CategoriaContabil, ExtratosEtapas } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-extrato-financeiro-etapas',
    templateUrl: './extrato-financeiro-etapas.component.html',
    styles: []
})
export class ExtratoFinanceiroEtapasComponent implements OnInit {

    projeto: Projeto;
    extrato: ExtratosEtapas;
    etapas: { [propName: number]: Etapa } = {};
    categoriasContabeis: { [propName: string]: TextValue } = {
        "RH": { text: "Recursos Humanos", value: "RH" }
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get extratoEtapas() {
        return this.extrato ? this.extrato.etapas.filter(e => e.total > 0) : [];
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

    openModal(id: number) {
        const modalRef = this.app.modal.open(RecursoHumanoFormComponent, { size: 'lg' });
        modalRef.componentInstance.recurso_id = id;
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
        const extratos$ = this.app.projetos.getExtratoEtapas(this.projeto.id);
        const etapas$ = this.app.projetos.getEtapas(this.projeto.id);

        zip(extratos$, etapas$).subscribe(([extrato, etapas]) => {

            console.log({ extrato });

            this.extrato = extrato;

            etapas.forEach((etapa, index) => {
                this.etapas[etapa.id] = Object.assign(etapa, { numeroEtapa: index + 1 });
            });
            this.loading.hide();
        });
    }

}
