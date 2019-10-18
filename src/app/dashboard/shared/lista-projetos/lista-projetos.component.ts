import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Projeto, Empresa, User } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogsService } from '@app/core/services/catalogs.service';
import { filter } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/core/services/app.service';
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NovoProjetoComponent } from '@app/core/shared/novo-projeto/novo-projeto.component';

@Component({
  selector: 'app-projetos-list',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
  empresas = this.catalog.empresas();
  status = this.catalog.status();
  filterForm = new FormGroup({
    catalogStatusId: new FormControl(''),
    catalogEmpresaId: new FormControl(''),
    search: new FormControl(''),
  });

  currentUser: User;

  @ViewChild(LoadingComponent) loading: LoadingComponent;
  @Input() projetos: Array<Projeto>;
  @Input() titulo = "Projetos";
  @Input() projetoStatus;

  @Output() updateRequest: EventEmitter<any> = new EventEmitter();

  get canAddProject() {
    return this.currentUser && this.currentUser.role === "Admin-APIGestor";
  }

  constructor(protected catalog: CatalogsService, protected route: ActivatedRoute, protected app: AppService, public modal: NgbModal) {
  }

  async ngOnInit() {
    if (this.route.snapshot.data.projetos && this.projetos === null) {
      this.projetos = this.route.snapshot.data.projetos;
    } else if (this.route.snapshot.data.projetoStatus) {
      this.projetoStatus = this.route.snapshot.data.projetoStatus;
      this.updateProjetos();
    }
    if (this.route.snapshot.data.titulo) {
      this.titulo = this.route.snapshot.data.titulo;
    }
    this.updateRequest.subscribe(() => this.updateProjetos());

    this.app.users.currentUserUpdated.subscribe(user => {
      if (user !== null) {
        this.currentUser = user;
      }
    });

  }
  async updateProjetos() {
    if (this.projetoStatus) {
      this.projetos = await this.app.projetos.getProjetos(this.projetoStatus).toPromise();
    }
  }

  get projetosFiltered() {
    const value = this.filterForm.value;
    let projetos = this.projetos;
    if (value.catalogStatusId.length > 0) {
      projetos = filter(this.projetos, p => p.catalogStatusId === parseInt(value.catalogStatusId, 10));
    }

    if (value.catalogEmpresaId.length > 0) {
      projetos = filter(this.projetos, p => p.catalogEmpresaId === parseInt(value.catalogEmpresaId, 10));
    }

    if (value.search.trim().length > 0) {
      const search = value.search.trim().toLowerCase();
      projetos = filter(this.projetos, (p: Projeto) => {
        return (p.titulo.toLowerCase().match(search) !== null ||
          p.numero.match(search) !== null ||
          p.tituloDesc.toLowerCase().match(search) !== null);
      });
    }
    return projetos;
  }

  get total_projetos() {
    return this.projetosFiltered.length || 0;
  }


  openNovoProjeto() {

    this.modal.open(NovoProjetoComponent, { size: 'lg' }).result.then(value => {
      if (value.sucesso) {
        // this.loadData();
      }
    }).catch(reason => {
      console.log(reason);
    });

  }

}
