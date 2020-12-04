import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {clone, merge} from 'lodash-es';

interface ButtomOption {
  title?: string;
  iconClassName?: string;
  tooltip?: string;
  className?: string;
}

interface OrderOptions {
  background?: string;
  deleteButton?: ButtomOption;
  upButton?: ButtomOption;
  downButton?: ButtomOption;
}

@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.scss']
})
export class OrderContentComponent implements OnInit {

  private defaultOptions: OrderOptions = {
    background: 'bg-cinza-claro',
    deleteButton: {
      iconClassName: 'ta-times-circle',
      tooltip: 'Excluir',
      className: 'btn-sm align-self-center'
    },
    downButton: {
      iconClassName: 'ta-arrow-down fs-32',
      tooltip: 'Descer',
    },
    upButton: {
      iconClassName: 'ta-arrow-up fs-32',
      tooltip: 'Subir',
    },
  };

  @Input() indice;
  @Input() min = 0;
  @Input() total = Number.MAX_VALUE;
  @Input() options: OrderOptions = {};
  @Input() showOrder = true;
  @Input() showRemove = true;

  @Output() beforeMove: EventEmitter<{ index: number, offset: number }> = new EventEmitter<{ index: number, offset: number }>();
  @Output() move: EventEmitter<{ index: number, offset: number }> = new EventEmitter<{ index: number, offset: number }>();
  @Output() afterMove: EventEmitter<{ index: number, offset: number }> = new EventEmitter<{ index: number, offset: number }>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.options = merge(this.defaultOptions, this.options);
  }

  moveTo(offset) {
    this.beforeMove.emit({index: this.indice, offset});
    setTimeout(() => {
      this.move.emit({index: this.indice, offset});
      setTimeout(() => {
        this.afterMove.emit({index: this.indice, offset});
      }, 10);
    }, 10);
  }

  remover() {
    this.remove.emit(this.indice);
  }
}
