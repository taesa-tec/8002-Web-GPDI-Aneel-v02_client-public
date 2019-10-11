import { ListaProjetosComponent } from './../../lista-projetos/lista-projetos.component';
import { LoadingComponent } from './../../../core/shared/app-components/loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../../core/services/app.service';
import { NovoProjetoComponent } from './../../../core/shared/novo-projeto/novo-projeto.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, Projeto } from '@app/models';

@Component({
  selector: 'app-projeto-iniciado',
  templateUrl: './projeto-iniciado.component.html',
  styleUrls: ['./projeto-iniciado.component.scss']
})
export class ProjetoIniciadoComponent implements OnInit {

  projetos: Projeto[];
  currentUser: User;

  protected subProjetcs: Subscription;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  @ViewChild(ListaProjetosComponent) list: ListaProjetosComponent;


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
      console.log('proe', this.projetos);
      this.loading.hide();
  }

}
