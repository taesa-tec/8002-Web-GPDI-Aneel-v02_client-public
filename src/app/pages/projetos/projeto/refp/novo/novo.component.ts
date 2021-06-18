import {Component, OnInit} from '@angular/core';
import {MenuItem, TOPNAV_MENU} from '@app/commons';


const menu: Array<MenuItem> = [
  {text: 'Recurso Humano', path: 'recurso-humano'},
  {text: 'Recurso Material', path: 'recurso-material'}
];

@Component({
  providers: [
    {
      provide: TOPNAV_MENU,
      useValue: menu
    }
  ],
  template: '<app-topnav></app-topnav>',
  styles: []
})
export class NovoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
