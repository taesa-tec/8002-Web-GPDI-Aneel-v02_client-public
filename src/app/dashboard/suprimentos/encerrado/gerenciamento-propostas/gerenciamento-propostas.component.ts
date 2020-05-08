import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-propostas',
  templateUrl: './gerenciamento-propostas.component.html',
  styleUrls: ['./gerenciamento-propostas.component.scss']
})
export class GerenciamentoPropostasComponent implements OnInit {

  menu: Array<any>;

  constructor() { }

  ngOnInit() {
    this.menu = [
      {text: 'Propostas Recebidas', path: 'recebidas'},
      {text: 'Propostas Negadas', path: 'negadas'},
    ]
  }

}
