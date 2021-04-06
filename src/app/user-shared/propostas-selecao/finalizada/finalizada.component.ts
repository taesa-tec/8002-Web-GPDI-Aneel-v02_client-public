import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';

@Component({
  selector: 'app-finalizada',
  templateUrl: './finalizada.component.html',
  styles: []
})
export class FinalizadaComponent implements OnInit {

  buttons: TableComponentActions = [
    {
      action: '',
      text: 'Ver Detalhes',
      icon: 'ta-eye'
    }
  ];
  data: Array<any> = [];
  cols: TableComponentCols = [
    {field: 'titulo', title: 'Titulo'},
    {field: 'proposta', title: 'Proposta Selecionada'},
    {field: 'responsavel', title: 'Responsável Refinamento'},
    {field: 'data', title: 'Data Alvo'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
