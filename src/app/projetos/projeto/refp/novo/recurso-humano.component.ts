import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recurso-humano',
  templateUrl: './recurso-humano.component.html',
  styles: []
})
export class RecursoHumanoComponent implements OnInit {


  form = this.fb.group({});

  constructor(protected fb: FormBuilder, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
