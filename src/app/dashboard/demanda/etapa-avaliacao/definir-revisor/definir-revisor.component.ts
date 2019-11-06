import {Component, Input, OnInit} from '@angular/core';
import {Demanda} from '@app/models/demandas';

@Component({
  selector: 'app-definir-revisor',
  templateUrl: './definir-revisor.component.html',
  styleUrls: ['./definir-revisor.component.scss']
})
export class DefinirRevisorComponent implements OnInit {
  @Input() demanda: Demanda;

  constructor() {
  }

  ngOnInit() {
  }

}
