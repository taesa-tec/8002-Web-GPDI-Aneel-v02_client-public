import {Component, Input, OnInit} from '@angular/core';
import {Demanda} from '@app/models/demandas';

@Component({
  selector: 'app-avaliar-demanda',
  templateUrl: './avaliar-demanda.component.html',
  styleUrls: ['./avaliar-demanda.component.scss']
})
export class AvaliarDemandaComponent implements OnInit {

  @Input() demanda: Demanda;

  constructor() {
  }

  ngOnInit() {
  }

}
