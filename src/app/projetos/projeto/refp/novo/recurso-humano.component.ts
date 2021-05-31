import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recurso-humano',
  templateUrl: './recurso-humano.component.html',
  styles: []
})
export class RecursoHumanoComponent implements OnInit {


  form = this.fb.group({});

  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
