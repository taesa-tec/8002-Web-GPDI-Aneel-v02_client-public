import {Component, OnInit} from '@angular/core';

import {AppService} from '@app/services/app.service';
import {TableComponentActions, TableComponentCols, TableComponentFilter} from '@app/core/components/table/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Pagination} from '@app/commons/common';
import {ActivatedRoute} from '@angular/router';
import {FornecedorFormComponent} from '@app/user-admin/configuracoes/fornecedores/fornecedor-form/fornecedor-form.component';
import {ServiceBase} from '@app/services/service-base.service';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  fornecedor: any;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'id',
      title: 'Id',
      order: true
    },
    {
      field: 'nome',
      title: 'Nome Fornecedor',
      order: true
    },
    {
      field: 'responsavelNome',
      title: 'Responsável',
      order: true
    },
    {
      field: 'ativo',
      title: 'Status',
      value: i => i.ativo ? 'Ativo' : 'Inativo',
      order: true
    }
  ];

  buttons: TableComponentActions = [
    {
      action: './#${id}',
      isLink: true,
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  fornecedores: Pagination<any> = {
    perPage: 0,
    page: 0,
    totalItems: 0,
    data: [],
    totalPages: 0
  };

  data: any;

  constructor(
    protected app: AppService,
    protected service: ServiceBase<any>,
    protected modal: NgbModal,
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.route.data.subscribe(data => {
      if (data.fornecedores) {
        this.data = data.fornecedores;
      }
    });

    this.route.fragment.subscribe(fragment => {
      const id = parseFloat(fragment);
      if (Number.isSafeInteger(id)) {
        this.service.obter(id).then(fornecedor => {
          this.setFornecedor(fornecedor);
        });
      }
    });

  }

  setFornecedor(fornecedor) {
    this.fornecedor = fornecedor;
    if (this.fornecedor) {
      this.openForm(this.fornecedor).then();
    }
  }

  async openForm(fornecedor?: any) {
    const ref = this.modal.open(FornecedorFormComponent, {backdrop: false, size: 'lg'});
    const form = ref.componentInstance as FornecedorFormComponent;
    if (fornecedor) {
      form.fornecedor = fornecedor;
    }
    try {
      if (await ref.result) {
        this.data = await this.service.obter();
      }
    } catch (e) {
      //console.error(e);
    } finally {
      await this.app.router.navigateByUrl('/admin/configuracoes/fornecedores', {fragment: ''});
    }

  }


}
