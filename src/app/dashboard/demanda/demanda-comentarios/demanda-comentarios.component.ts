import {Component, Input, OnInit} from '@angular/core';
import {Demanda} from '@app/models/demandas';

@Component({
  selector: 'app-demanda-comentarios',
  templateUrl: './demanda-comentarios.component.html',
  styles: []
})
export class DemandaComentariosComponent implements OnInit {
  @Input() demanda: Demanda;

  constructor() {
  }

  ngOnInit() {
  }

}
