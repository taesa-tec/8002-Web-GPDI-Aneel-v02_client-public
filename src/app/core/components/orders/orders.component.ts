import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-handler-order',
  template: `
    <div class="d-flex flex-column order-handler" [ngClass]="orderClass">
      <span class="order-desc" (click)="_order('desc')">&#9650;</span>
      <span class="order-asc" (click)="_order()">&#9660;</span>
    </div>`,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() {
  }

  @Input() field: string;
  @Input() type: string;
  @Input() current: { field: string; direction: 'asc' | 'desc' };
  @Input() currents: Array<{ field: string; direction: 'asc' | 'desc' }>;
  @Output() order: EventEmitter<{ field: string; type: string; direction: 'asc' | 'desc' }> = new EventEmitter();
  protected isLastOrder = false;

  ngOnInit() {
  }

  get orderClass() {
    if (this.currents) {
      const f = this.currents.findIndex(ord => ord.field === this.field);
      if (f > -1) {
        this.current = this.currents[f];
        this.isLastOrder = f === this.currents.length - 1;
      }
    }


    if (this.current) {

      const c = {
        active: this.field === this.current.field,
        'last-active': this.isLastOrder
      };

      if (c.active) {
        c[this.current.direction] = true;
      }

      return c;
    }
    return {};
  }


  _order(direction: 'asc' | 'desc' = 'asc') {
    if (this.current && this.current.field === this.field && this.isLastOrder) {
      this.order.emit({field: this.field, type: this.type, direction: this.current.direction === 'asc' ? 'desc' : 'asc'});
    } else {
      this.order.emit({field: this.field, type: this.type, direction});
    }
  }

}
