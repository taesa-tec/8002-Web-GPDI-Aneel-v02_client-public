import { Component, OnInit } from '@angular/core';
import { EtapasList, TodasDemandas } from '@app/demandas/demandas-teste';

@Component({
  selector: 'app-elaboracao',
  templateUrl: './elaboracao.component.html',
  styleUrls: ['./elaboracao.component.scss']
})
export class ElaboracaoComponent implements OnInit {

  dem = TodasDemandas;
  list = EtapasList;

  get validaEtapa() {
    return 'badge-danger';
  }


  constructor() { }

  ngOnInit() {
    console.log(this.dem);
  }

}
