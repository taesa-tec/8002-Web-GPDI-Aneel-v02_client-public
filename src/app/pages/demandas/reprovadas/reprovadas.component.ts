import {EtapasList, TodasDemandas} from '../demandas-teste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reprovadas',
  templateUrl: './reprovadas.component.html',
  styleUrls: ['./reprovadas.component.scss']
})
export class ReprovadasComponent implements OnInit {


  dem = TodasDemandas;
  list = EtapasList;
  constructor() { }

  ngOnInit() {
  }

}
