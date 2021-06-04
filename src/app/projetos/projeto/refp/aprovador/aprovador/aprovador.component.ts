import {Component, OnInit} from '@angular/core';
import {Registro} from '@app/projetos/projeto/refp/registro';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styles: []
})
export class AprovadorComponent implements OnInit {

  registro: Registro;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (!this.registro) {
      throw new Error('Registro não foi atribuido!');
    }
  }

}
