import {Component, OnInit} from '@angular/core';
import {CaptacaoComponent} from '@app/users-modules/suprimento/captacoes/captacao/captacao.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styles: []
})
export class PropostasComponent implements OnInit {

  menu = [
    {text: 'Propostas Em Aberto', path: 'em-aberto'},
    {text: 'Propostas Recebidas', path: 'recebidas'},
    {text: 'Propostas Negadas', path: 'negadas'},
  ];


  constructor(protected route: ActivatedRoute, public parent: CaptacaoComponent) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(f => {

    });
    if (this.parent.captacao.finalizada) {
      this.menu = [{text: 'Propostas Recebidas', path: 'recebidas'},
        {text: 'Propostas Negadas', path: 'negadas'}];
    }
  }

}
