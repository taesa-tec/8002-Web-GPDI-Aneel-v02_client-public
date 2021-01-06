import {Component, OnInit} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

const colsMap = new Map<string, TableComponentCols>([
  ['pendente',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Criação', field: 'dataCriacao', pipe: new DatePipe('pt-BR'), value: item => [item.dataCriacao, 'short']},
      {title: 'Status', field: 'status', value: i => 'Em desenvolvimento'},
    ]
  ],
  ['aceito',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Resposta', field: 'dataResposta', pipe: new DatePipe('pt-BR'), value: item => [item.dataResposta, 'short']},
      {title: 'Status', field: 'status', value: i => 'Em desenvolvimento'},
    ]
  ],
  ['rejeitado',
    [
      {title: 'Nome do fornecedor', field: 'fornecedor'},
      {title: 'Data de Resposta', field: 'dataResposta', pipe: new DatePipe('pt-BR'), value: item => [item.dataResposta, 'short']},
      {title: 'Status', field: 'status', value: i => 'Em desenvolvimento'},
    ]
  ]
]);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  cols: TableComponentCols;
  data: Array<any>;

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.data = data.propostas;
    });
    this.route.params.subscribe(params => {
      if (params && params.status && colsMap.has(params.status)) {
        this.cols = colsMap.get(params.status);
      }
    });
  }

}
