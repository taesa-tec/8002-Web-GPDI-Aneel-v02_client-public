import { Component, OnInit } from '@angular/core';
import { EtapasList, TodasDemandas } from "@app/dashboard/demandas/demandas-teste";

@Component({
  selector: 'app-demandas-list',
  templateUrl: './demandas-list.component.html',
  styleUrls: ['./demandas-list.component.scss']
})
export class DemandasListComponent implements OnInit {

  list = EtapasList;
  demandas = [1, 2, 3, 4, 5];

  get validaEtapa() {
    return 'badge-danger';
  }


  constructor() { }

  ngOnInit() {
  }

}
