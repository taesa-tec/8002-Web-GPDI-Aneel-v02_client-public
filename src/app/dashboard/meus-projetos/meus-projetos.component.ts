import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '@app/projetos/novo-projeto/novo-projeto.component';
import { Projeto } from '@app/models';
import { Empresa } from '@app/models';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { of, merge, Observable, interval, zip } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-meus-projetos',
    templateUrl: './meus-projetos.component.html',
    styleUrls: []
})
export class MeusProjetosComponent implements OnInit {

    projetos: Projeto[];

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) {
        this.projetos = [];
    }

    openNovoProjeto() {
        this.app.modal.open(NovoProjetoComponent, { size: 'lg' }).result.then(value => {
            if (value.sucesso) {
                this.loadData();
            }
        }).catch(reason => {
            console.log(reason);
        });

    }

    ngOnInit() {
        this.app.users.currentUserUpdated.subscribe(user => {
            this.loadData();
        });
    }
    loadData() {
        this.loading.show();
        zip(this.app.projetos.meusProjetos()).subscribe(([projetos]) => {
            this.projetos = projetos.map(p$ => p$.projeto);
            this.projetos.forEach(projeto => {
                this.app.users.currentUserCanAccess(projeto).subscribe(can => {
                    console.log({ projeto, can });

                });
            });
            this.loading.hide();
        });
    }

}
