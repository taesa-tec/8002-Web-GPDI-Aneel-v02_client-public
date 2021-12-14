import {Component, Input, Output, EventEmitter} from '@angular/core';
import {LogProjeto} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-demanda-log-item',
  templateUrl: './log.component.html',
  styles: []
})
export class LogComponent {

  @Input() log: LogProjeto;
  @Output() viewForm: EventEmitter<any> = new EventEmitter<any>();

  avatar: SafeUrl;

  constructor(protected app: AppService) {
  }

  get hasLogDataStatusNovo() {
    return this.log.data.statusNovo !== null && this.log.data.statusNovo.length > 0;
  }

  get hasLogDataStatusAnterior() {
    return this.log.data.statusAnterior !== null && this.log.data.statusAnterior.length > 0;
  }

  get hasStatusAnterior() {
    return (this.log.statusAnterior.trim().length > 0 && this.logDataStatusAnterior === null) || this.hasLogDataStatusAnterior;
  }

  get hasStatusNovo() {
    return (this.log.statusNovo.trim().length > 0 && this.logDataStatusNovo === null) || this.hasLogDataStatusNovo;
  }

  get logDataStatusAnterior() {
    return this.log.data.statusAnterior;
  }

  get logDataStatusNovo() {
    return this.log.data.statusNovo;
  }

  get logStatusAnterior() {
    return this.log.statusAnterior;
  }

  get logStatusNovo() {
    return this.log.statusNovo;
  }

  visualizarDemandaForm(formData) {
    this.viewForm.emit(formData);
  }

}
