import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  private _isCollapsed = true;

  get isCollapsed(): boolean {
    return this.isLocked || this._isCollapsed;
  }

  @Input() set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }

  @Input() isLocked = false;

  toogle() {
    this._isCollapsed = !this._isCollapsed;
  }

}
