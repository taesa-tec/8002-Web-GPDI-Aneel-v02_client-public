import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Demanda} from '@app/commons/demandas';
import {User} from '@app/commons';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-definir-revisor',
  templateUrl: './definir-revisor.component.html',
  styles: []
})
export class DefinirRevisorComponent implements OnInit {
  @Input() demanda: Demanda;
  @Input() users: Array<User>;
  @Output() userSelected: EventEmitter<any> = new EventEmitter<any>();
  form = new FormGroup({
    revisorId: new FormControl('', Validators.required)
  });

  constructor() {
  }

  ngOnInit() {
  }

}
