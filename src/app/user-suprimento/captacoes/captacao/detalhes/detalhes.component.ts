import {Component, OnInit} from '@angular/core';
import {CaptacaoDetalhes} from '@app/user-shared/captacao';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styles: []
})
export class DetalhesComponent implements OnInit {

  get captacao(): CaptacaoDetalhes {
    return this.parent?.captacao;
  }

  constructor(public parent: CaptacaoComponent) {
  }

  ngOnInit(): void {
  }

}
