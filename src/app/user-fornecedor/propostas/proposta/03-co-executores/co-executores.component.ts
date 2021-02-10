import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TableActionEvent} from '@app/core/components/table/table';
import {CoExecutorFormComponent} from './co-executor-form/co-executor-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {CAPTACAO_ID} from '@app/user-fornecedor/propostas/proposta/shared';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-co-executores',
  templateUrl: './co-executores.component.html',
  styleUrls: ['./co-executores.component.scss']
})
export class CoExecutoresComponent implements OnInit {

  coExecutores: Array<any>;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'id',
      title: 'ID',
      order: true,
    }, {
      field: 'razaoSocial',
      title: 'Nome ou Razão Social',
      order: true,
    },
    {
      field: 'cnpj',
      title: 'CNPJ',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      action: 'editar',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  constructor(
    @Inject(CAPTACAO_ID) private captacaoId: number,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal) {
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.coExecutores = data.coExecutores;
    });
  }

  async modalCoExecutora(coExecutor?) {
    const ref = this.modal.open(CoExecutorFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as CoExecutorFormComponent;
    cmp.captacaoId = this.captacaoId;
    cmp.coExecutor = coExecutor;
    const result = await ref.result;
    // @todo
  }

  async tableAction(evt: TableActionEvent) {
    await this.modalCoExecutora(evt.data);
    await this.router.navigate(['./'], {relativeTo: this.route, queryParams: {update: Date.now()}});
  }

}
