import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription, zip} from 'rxjs';

import {NovoProjetoComponent} from '@app/core/shared/novo-projeto/novo-projeto.component';
import {Projeto, User, Roles, UserRole} from '@app/models';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AppService} from '@app/core/services/app.service';
import {map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-meus-projetos',
    templateUrl: './meus-projetos.component.html',
    styleUrls: []
})
export class MeusProjetosComponent implements OnInit {

    projetos: Projeto[];
    currentUser: User;

    protected subProjetcs: Subscription;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, public modal: NgbModal) {
        this.projetos = [];
    }

    openNovoProjeto() {

        this.modal.open(NovoProjetoComponent, {size: 'lg'}).result.then(value => {
            if (value.sucesso) {
                this.loadData();
            }
        }).catch(reason => {
            console.log(reason);
        });

    }

    ngOnInit() {
        this.subProjetcs = this.app.users.currentUserUpdated.subscribe(user => {
            if (user !== null) {
                const curr = this.currentUser;
                this.currentUser = user;
                if ((curr && curr.id !== user.id) || this.projetos.length === 0) {
                    this.loadData();
                }

            }
        });
    }

    async loadData() {
        if (this.currentUser || this.projetos.length > 0) {
            // this.subProjetcs.unsubscribe();
        }
        this.loading.show();
        this.projetos = await this.app.projetos.meusProjetos().toPromise();
        this.loading.hide();
    }

}
