import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './propostas.component.html',
})
export class PropostasComponent {

  menu = [
    {text: 'Propostas Em Aberto', path: 'em-aberto'},
    {text: 'Propostas Encerradas', path: 'encerradas'},
  ];
  constructor(protected route: ActivatedRoute) {
  }


}
