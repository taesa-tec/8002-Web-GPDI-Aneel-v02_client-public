import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './projetos-captacao.component.html',
  styleUrls: ['./projetos-captacao.component.scss']
})
export class ProjetosCaptacaoComponent implements OnInit {

  menu: Array<any>;

  constructor() { }

  ngOnInit() {
    this.menu = [
      {text: 'Captação Pendente', path: 'pendente'},
      {text: 'Captação em Elaboração', path: 'elaboracao'},
      {text: 'Captação Aberta', path: 'aberta'},
      {text: 'Captação Encerrada', path: 'encerrada'},
      {text: 'Captação Cancelada', path: 'cancelada'},
    ]
  }

}
