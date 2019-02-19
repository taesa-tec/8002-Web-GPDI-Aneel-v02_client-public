import { Component, OnInit, Input } from '@angular/core';
import { LogProjeto } from '@app/models';

@Component({
  selector: 'app-log-item',
  templateUrl: './log.component.html',
  styles: []
})
export class LogComponent implements OnInit {

  @Input() log: LogProjeto;

  constructor() { }

  ngOnInit() {
    console.log(this.log);
    
  }

}
