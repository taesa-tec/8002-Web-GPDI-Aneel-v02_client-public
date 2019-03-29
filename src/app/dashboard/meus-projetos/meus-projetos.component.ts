import { Component, OnInit, ViewChild } from '@angular/core';
import { zip } from 'rxjs';

import { NovoProjetoComponent } from '@app/projetos/novo-projeto/novo-projeto.component';
import { Projeto, User } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-meus-projetos',
    templateUrl: './meus-projetos.component.html',
    styleUrls: []
})
export class MeusProjetosComponent implements OnInit {

    projetos: Projeto[];
    currentUser: User;

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
            this.currentUser = user;
            this.loadData();
        });
    }
    loadData() {
        this.loading.show();
        zip(this.app.projetos.meusProjetos()).subscribe(([projetos]) => {
            this.projetos = projetos.map(p$ => p$.projeto);
            this.loading.hide();
        });
    }

}
