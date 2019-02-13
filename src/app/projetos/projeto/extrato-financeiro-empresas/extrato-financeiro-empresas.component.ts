import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Projeto, ExtratosEmpresas } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-extrato-financeiro-empresas',
    templateUrl: './extrato-financeiro-empresas.component.html',
    styles: []
})
export class ExtratoFinanceiroEmpresasComponent implements OnInit {

    projeto: Projeto;
    extrato: ExtratosEmpresas;

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
    ) { }

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
        this.app.projetos.getExtratoEmpresas(this.projeto.id).subscribe(result => {
            this.extrato = result;
            this.loading.hide();
        }, error => {
            this.loading.hide();
        });
    }

}
