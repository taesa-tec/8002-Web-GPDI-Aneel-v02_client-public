import {Component, OnInit} from '@angular/core';
import {MenuItem, UserRole} from '@app/commons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  menu: Array<MenuItem> = [
    {text: 'Seleção Pendente', path: 'pendente', role: [UserRole.Administrador, UserRole.User]},
    {text: 'Seleção Finalizada', path: 'finalizada', role: [UserRole.Administrador, UserRole.User]},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
