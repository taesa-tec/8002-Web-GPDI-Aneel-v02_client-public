import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TableActionEvent} from '@app/core/components/table/table';
import {CoExecutorFormComponent} from './co-executor-form/co-executor-form.component';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';
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
      value: i => i.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    }
  ];

  buttons: TableComponentActions;

  filters: Array<TableComponentFilter> = [];

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
  ) {
    this.buttons = [
      {
        action: 'editar',
        text: this.canEdit ? 'EDITAR' : 'VISUALIZAR',
        icon: this.canEdit ? 'ta-edit' : 'ta-eye',
        className: 'btn btn-primary'
      }
    ];
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.coExecutores = data.coExecutores;
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo') {
        this.modalCoExecutora();
      }
    });
  }

  async modalCoExecutora(coExecutor?) {
    const ref = this.modal.open(CoExecutorFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as CoExecutorFormComponent;
    cmp.coExecutor = coExecutor;
    await ref.result;
    await this.router.navigate(['./'], {relativeTo: this.route});
  }

  async tableAction(evt: TableActionEvent) {
    await this.router.navigate(['./'], {relativeTo: this.route, fragment: evt.data.id.toString()});
    await this.modalCoExecutora(evt.data);
  }

}
