import {Component, OnInit} from '@angular/core';
import {CaptacaoComponent} from '@app/users-modules/suprimento/captacoes/captacao/captacao.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './propostas.component.html',
})
export class PropostasComponent implements OnInit {

  menu = [
    {text: 'Propostas Em Aberto', path: 'em-aberto'},
    {text: 'Propostas Encerradas', path: 'encerradas'},
  ];


  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(f => {
    });

  }

}
