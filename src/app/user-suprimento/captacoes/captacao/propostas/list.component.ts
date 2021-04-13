import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PropostaDetalhesComponent} from '@app/user-suprimento/captacoes/captacao/propostas/proposta-detalhes/proposta-detalhes.component';

const getPropostaStatus = b => b ? ['Submetido', 'text-success'] : ['Pendente', 'text-danger'];

const getPropostaTemplate = item => {
  if (item.captacaoStatus === 'Cancelada') {
    return '<span class="text-danger">Participação cancelada</span>';
  }
  if (item.participacao === 0) {
    return '<span class="text-danger">Participação pendente</span>';
  }
  const c = getPropostaStatus(item.contratoFinalizado);
  const p = getPropostaStatus(item.planoFinalizado);
  return `<div>Minuta Contrato <span class="${c[1]}">(${c[0]})</span></div>
<div>Plano de Trabalho <span class="${p[1]}">(${p[0]})</span></div>`;
};

const colsMap = new Map<string, TableComponentCols>([
  ['em-aberto',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Criação', field: 'dataCriacao', pipe: new DatePipe('pt-BR'), value: item => [item.dataCriacao, 'short']},
      {title: 'Status', field: 'status', type: 'template', value: i => i, template: getPropostaTemplate},
    ]
  ],
  ['recebidas',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Resposta', field: 'dataResposta', pipe: new DatePipe('pt-BR'), value: item => [item.dataResposta, 'short']},
      {title: 'Status', field: 'status', type: 'template', value: i => i, template: getPropostaTemplate},
    ]
  ],
  ['negadas',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Resposta', field: 'dataResposta', pipe: new DatePipe('pt-BR'), value: item => [item.dataResposta, 'short']},
      {
        title: 'Status',
        field: 'status',
        type: 'template',
        value: i => i,
        template: '<span class="text-danger">Participação Recusada</span>'
      },
    ]
  ]
]);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  buttons: TableComponentActions = [];
  cols: TableComponentCols;
  data: Array<any>;

  constructor(
    protected route: ActivatedRoute,
    protected parent: CaptacaoComponent,
    protected router: Router,
    protected modal: NgbModal
  ) {
  }

  ngOnInit(): void {

    this.route.fragment.subscribe(f => {
      if (!isNaN(parseFloat(f))) {
        this.openPropostaDetalhes().then();
      }
    });
    this.route.data.subscribe(data => {
      this.data = data.propostas;
    });
    this.route.params.subscribe(params => {
      this.cols = [];
      if (this.parent.captacao.finalizada) {
        switch (params.status) {
          case 'em-aberto':
            this.router.navigate(['../recebidas'], {relativeTo: this.route}).then();
            return;
          case 'recebidas':
            this.buttons = [
              {text: 'Ver Detalhes', isLink: true, action: './#${id}', className: 'btn btn-primary'}
            ];
            break;
          default:
            this.buttons = [];
        }

      }
      if (params && params.status && colsMap.has(params.status)) {
        this.cols = colsMap.get(params.status);
      }
    });
  }

  async openPropostaDetalhes() {
    const ref = this.modal.open(PropostaDetalhesComponent, {size: 'lg'});
    ref.componentInstance.route = this.route;
    await ref.result;
    await this.router.navigate(['./'], {relativeTo: this.route});
  }

}
