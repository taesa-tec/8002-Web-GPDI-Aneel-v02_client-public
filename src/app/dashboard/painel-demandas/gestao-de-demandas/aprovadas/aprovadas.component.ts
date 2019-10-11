import {EtapasList, TodasDemandas} from './../demandas-teste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aprovadas',
  templateUrl: './aprovadas.component.html',
  styleUrls: ['./aprovadas.component.scss']
})
export class AprovadasComponent implements OnInit {


  dem = TodasDemandas;
  list = EtapasList;
  constructor() { }

  ngOnInit() {
  }

}
