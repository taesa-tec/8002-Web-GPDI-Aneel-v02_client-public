import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  propriedade: any;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    dataPedido: ['', Validators.required],
    numeroPedido: ['', Validators.required],
    titulo: ['', Validators.required]
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
