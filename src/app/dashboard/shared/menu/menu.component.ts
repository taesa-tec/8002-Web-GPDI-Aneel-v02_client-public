import {Component, Inject, InjectionToken, Input, OnInit, Optional} from '@angular/core';

export const MENU_SIDE_BAR = new InjectionToken<Array<MenuItem>>('Menu Lateral');

export interface MenuItem {
  text: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menu: Array<MenuItem>;

  constructor(@Optional() @Inject(MENU_SIDE_BAR) menu?: Array<MenuItem>) {
    console.log(menu);
    if (menu) {
      this.menu = menu;
    }
  }

  ngOnInit(): void {
  }

}
