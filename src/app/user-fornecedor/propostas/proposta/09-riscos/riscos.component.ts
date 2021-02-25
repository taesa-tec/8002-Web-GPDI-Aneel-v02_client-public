import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {EtapaFormComponent} from '@app/user-fornecedor/propostas/proposta/07-etapas/etapa-form/etapa-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';

@Component({
  selector: 'app-riscos',
  templateUrl: './riscos.component.html',
  styleUrls: ['./riscos.component.scss']
})
export class RiscosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'item',
      title: 'Item',
      order: true,
    },
    {
      field: 'classificacao',
      title: 'Classificação',
      order: true,
    },
    {
      field: 'probabilidade',
      title: 'Probabilidade',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      isLink: true,
      action: './#${id}',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  riscos: Array<any> = [];

  constructor(private app: AppService,
              private modal: NgbModal,
              protected router: Router,
              protected route: ActivatedRoute,
              protected parent: PropostaComponent) {
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.riscos = data.riscos;
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this.openForm();
      }
    });
  }

  async tableAction({action, data}) {
    if (action === 'editar') {
      await this.salvarRisco(data);
    }
  }

  async openForm() {
    const ref = this.modal.open(RiscoFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as RiscoFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }


  async salvarRisco(risco?: any) {
    const modalRef = this.modal.open(RiscoFormComponent, {size: 'lg'});
    modalRef.componentInstance.risco = risco;

    try {
      await modalRef.result;
      //this.getRiscos();
    } catch (e) {
      console.log(e);
    }
  }

}
