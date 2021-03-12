import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  checkboxList: Array<any>;

  get options(): { text: string; value: any; cssClass: string; checked?: boolean; checkMessage?: string }[] {
    return this._options;
  }

  set options(value: { text: string; value: any; cssClass: string; checked?: boolean; checkMessage?: string }[]) {
    this._options = value;
    this.checkboxList = this._options
      .filter(o => o.checkMessage && o.checkMessage.trim().length > 0)
      .map(o => ({checkMessage: o.checkMessage || 'Confirmar', checked: o.checked || false, ...o}));
  }


  private _options: { text: string, value: any, cssClass: string, checked?: boolean, checkMessage?: string }[];
  title: string;
  message: string;


  constructor(protected activeModal: NgbActiveModal) {
  }

  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }

  isButtonDisable(item) {
    const btn = this.checkboxList.find(i => i.value === item.value);

    return !(!btn || btn.checked);
  }
}
