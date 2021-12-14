import {Component, Input} from '@angular/core';
import {Demanda} from '@app/commons/demandas';

@Component({
  selector: 'app-demanda-comentarios',
  templateUrl: './demanda-comentarios.component.html',
  styles: []
})
export class DemandaComentariosComponent {

  @Input() demanda: Demanda;

  constructor() {
  }
}
