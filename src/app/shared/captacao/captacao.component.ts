import {Component, OnInit} from '@angular/core';
import {MenuItem, UserRole} from '@app/commons';

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './captacao.component.html',
  styleUrls: ['./captacao.component.scss']
})
export class CaptacaoComponent implements OnInit {

  menu: Array<MenuItem>;

  constructor() {
  }

  ngOnInit() {
    this.menu = [
      {text: 'Captação Pendente', path: 'pendente', role: [UserRole.Administrador, UserRole.User]},
      {text: 'Captação em Elaboração', path: 'elaboracao', role: [UserRole.Administrador, UserRole.User, UserRole.Suprimento]},
      {text: 'Captação Aberta', path: 'aberta', role: [UserRole.Administrador, UserRole.User]},
      {text: 'Captação Encerrada', path: 'encerrada', role: [UserRole.Administrador, UserRole.User]},
      {text: 'Captação Cancelada', path: 'cancelada', role: [UserRole.Administrador, UserRole.User]},
    ];
  }

}
