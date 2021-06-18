import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions} from '@app/core/components/table/table';
import {ProdutoFormComponent} from './produto-form/produto-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutosService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

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

  buttons: TableComponentActions;
  produtos: Array<any> = [];

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    private app: AppService,
    private modal: NgbModal,
    protected service: ProdutosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buttons = [
      {
        isLink: true,
        action: './#${id}',
        text: this.canEdit ? 'EDITAR' : 'VISUALIZAR',
        icon: this.canEdit ? 'ta-edit' : 'ta-eye',
        className: 'btn btn-primary'
      }
    ];
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
