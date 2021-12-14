import {Component} from '@angular/core';

@Component({
  selector: 'app-central-administrativa',
  templateUrl: './central-administrativa.component.html',
  styleUrls: []
})
export class CentralAdministrativaComponent {

  menu = [
    {text: 'Alteração Status Projeto', path: 'alteracao-status-demanda'},
  ];


  constructor() {
  }
}
