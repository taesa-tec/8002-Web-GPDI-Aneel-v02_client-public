import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recurso-material',
  templateUrl: './recurso-material.component.html',
  styles: []
})
export class RecursoMaterialComponent implements OnInit {

  form = this.fb.group({});

  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
