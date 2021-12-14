import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-em-finalizacao',
  templateUrl: './em-finalizacao.component.html',
  styleUrls: ['./em-finalizacao.component.scss']
})
export class EmFinalizacaoComponent implements OnInit {

  cols: TableComponentCols = [
    {title: 'Titulo Resumido Projeto', field: 'titulo'},
    {title: 'Data Aprovação', field: 'dataCriacao', pipe: new DatePipe('pt-BR'), value: item => [item.dataCriacao, 'short']},
  ];
  buttons: TableComponentActions = [
    {isLink: true, text: 'Detalhes do projeto', action: '../${id}', className: 'btn btn-primary', icon: 'ta-edit'}
  ];

  projetos: Array<any> = [];

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.projetos = data.projetos;
    });
  }

}
