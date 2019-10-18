import {EtapasList, TodasDemandas} from '../demandas-teste';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviadas-para-captacao',
  templateUrl: './enviadas-para-captacao.component.html',
  styleUrls: ['./enviadas-para-captacao.component.scss']
})
export class EnviadasParaCaptacaoComponent implements OnInit {


  dem = TodasDemandas;
  list = EtapasList;
  constructor() { }

  ngOnInit() {
  }

}
