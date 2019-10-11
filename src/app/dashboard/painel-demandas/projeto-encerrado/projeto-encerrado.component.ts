import { CatalogsService } from '@app/core/services/catalogs.service';
import { ListaProjetosComponent } from './../../lista-projetos/lista-projetos.component';
import { LoadingComponent } from './../../../core/shared/app-components/loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../../core/services/app.service';
import { NovoProjetoComponent } from './../../../core/shared/novo-projeto/novo-projeto.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, Projeto, Empresa } from '@app/models';

@Component({
  selector: 'app-projeto-encerrado',
  templateUrl: './projeto-encerrado.component.html',
  styleUrls: ['./projeto-encerrado.component.scss']
})
export class ProjetoEncerradoComponent implements OnInit {

  projetos: Projeto[];
  currentUser: User;

  protected subProjetcs: Subscription;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  @ViewChild(ListaProjetosComponent) list: ListaProjetosComponent;


  @Input() projeto: Projeto;

  listStatus: any[];
  status: { id: number; status: string; } = {id: 0, status: 'encerrado'};
  empresa: Empresa;

  constructor(protected app: AppService, public modal: NgbModal,protected catalog: CatalogsService) {
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
      
      this.empresa = this.projeto.catalogEmpresa;
      this.status = this.projeto.catalogStatus;
  }

  async loadData() {
      if (this.currentUser || this.projetos.length > 0) {
          // this.subProjetcs.unsubscribe();
      }
      this.loading.show();
      this.projetos = await this.app.projetos.meusProjetos().toPromise();
      this.loading.hide();
  }

  get icon() {

      switch (this.status.id) {
          case 1:
              return 'ta-ficha';
          case 2:
              return 'ta-capacete';
          default:
              return 'ta-ok';

      }
  }

}
