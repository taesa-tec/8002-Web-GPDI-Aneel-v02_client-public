import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styles: []
})
export class PropostasComponent implements OnInit {

  menu = [
    {text: 'Propostas Em Aberto', path: 'pendente'},
    {text: 'Propostas Recebidas', path: 'aceito'},
    {text: 'Propostas Negadas', path: 'rejeitado'},
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
