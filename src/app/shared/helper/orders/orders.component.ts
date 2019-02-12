import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-handler-order',
  template: `<div class="d-flex flex-column order-handler" [ngClass]="orderClass">
  <span class="order-desc" (click)="_order('desc')">&#9650;</span>
  <span class="order-asc" (click)="_order()">&#9660;</span>
</div>`,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }
  @Input() field: string;
  @Input() current: { field: string; direction: 'asc' | 'desc'; };
  @Output() order: EventEmitter<{ field: string; direction: 'asc' | 'desc'; }> = new EventEmitter();

  ngOnInit() {
  }
  get orderClass() {
    if (this.current) {

      let c = {
        active: this.field === this.current.field
      };

      if (c.active) {
        c[this.current.direction] = true;
      }

      return c;
    }
    return {};
  }

  _order(direction: 'asc' | 'desc' = 'asc') {
    this.order.emit({ field: this.field, direction });
  }

}
