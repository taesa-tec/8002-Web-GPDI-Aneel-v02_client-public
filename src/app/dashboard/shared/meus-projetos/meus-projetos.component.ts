import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription, zip} from 'rxjs';

import {NovoProjetoComponent} from '@app/dashboard/shared/novo-projeto/novo-projeto.component';
import {Projeto, User, Roles, UserRole} from '@app/models';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '@app/services/users.service';

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.component.html',
  styleUrls: []
})
export class MeusProjetosComponent implements OnInit {

  projetos: Projeto[];

  currentUser: User;


  protected subProjetcs: Subscription;

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  get canAddProject() {
    return this.currentUser && this.currentUser.role === 'Admin-APIGestor';
  }


  constructor(protected app: AppService, protected usersService: UsersService, public modal: NgbModal) {
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
    this.subProjetcs = this.usersService.currentUserUpdated.subscribe(user => {
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
