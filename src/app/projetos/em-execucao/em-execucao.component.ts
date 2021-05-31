import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-em-execucao',
  templateUrl: './em-execucao.component.html',
  styleUrls: ['./em-execucao.component.scss']
})
export class EmExecucaoComponent implements OnInit {

  cols: TableComponentCols = [
    {title: 'Titulo Resumido Projeto', field: 'titulo'},
    {title: 'Data Aprovação', field: 'dataCriacao'},
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
