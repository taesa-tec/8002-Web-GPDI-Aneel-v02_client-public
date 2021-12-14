import {Component, ElementRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  message: string;
  title: string;

  set className(value) {
    const el: HTMLElement = this.elementRef.nativeElement;
    el.parentElement.classList.add(value);
  }

  constructor(public activeModal: NgbActiveModal, protected elementRef: ElementRef) {
  }

  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }

}
