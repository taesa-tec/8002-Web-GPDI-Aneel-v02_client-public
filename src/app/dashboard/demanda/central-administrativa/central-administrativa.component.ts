import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-central-administrativa',
  templateUrl: './central-administrativa.component.html',
  styleUrls: []
})
export class CentralAdministrativaComponent implements OnInit {

  menu = [
    {text: 'Alteração Status Projeto', path: 'alteracao-status-demanda'},
  ];


  constructor() {
  }

  ngOnInit() {
  }

}
