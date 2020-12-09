import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './captacao.component.html',
  styleUrls: ['./captacao.component.scss']
})
export class CaptacaoComponent implements OnInit {

  menu: Array<any>;

  constructor() {
  }

  ngOnInit() {
    this.menu = [
      {text: 'Captação Pendente', path: 'pendente'},
      {text: 'Captação em Elaboração', path: 'elaboracao'},
      {text: 'Captação Aberta', path: 'aberta'},
      {text: 'Captação Encerrada', path: 'encerrada'},
      {text: 'Captação Cancelada', path: 'cancelada'},
    ];
  }

}
