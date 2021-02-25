import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {ProdutoFormComponent} from './produto-form/produto-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutosService} from '@app/user-fornecedor/services/propostas.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  loading = false;
  hidePagination = false;
  fases: Array<any>;
  tipos: Array<any>;

  cols: TableComponentCols = [
    {
      field: 'titulo',
      title: 'Produto',
      order: true,
    }, {
      field: 'classificacao',
      title: 'Classificação',
      value: i => `Produto ${i.classificacao === 'Final' ? 'Final' : 'Intermediário'}`,
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
  produtos: Array<any> = [];

  constructor(
    private app: AppService,
    private modal: NgbModal,
    protected service: ProdutosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.produtos = data.produtos;
      this.fases = data.fases;
      this.tipos = data.tipos;
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this.formProduto();
      }
    });
  }

  async tableAction({action, data}) {
    if (action === 'editar') {
    }
  }

  async formProduto() {
    const ref = this.modal.open(ProdutoFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as ProdutoFormComponent;
    cmp.route = this.route;
    cmp.fases = this.fases;
    cmp.tipos = this.tipos;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }


}
