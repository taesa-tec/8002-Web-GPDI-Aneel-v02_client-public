import {Component} from '@angular/core';
import {MenuItem, UserRole} from '@app/commons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  menu: Array<MenuItem> = [
    {text: 'Formalização Pendente', path: 'pendente', role: [UserRole.Administrador, UserRole.User]},
    {text: 'Formalizados', path: 'formalizados', role: [UserRole.Administrador, UserRole.User]},
    {text: 'No Deal', path: 'no-deal', role: [UserRole.Administrador, UserRole.User]},
  ];
}
