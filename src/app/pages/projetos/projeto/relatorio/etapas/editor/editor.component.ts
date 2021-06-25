import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  etapa: any;

  form = this.fb.group({
    id: [0, Validators.required],
    atividadesRealizadas: ['', Validators.required],
    atividades: [{value: '', disabled: true}, Validators.required],
    produtos: [{value: '', disabled: true}, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  submit() {
    
  }

}
