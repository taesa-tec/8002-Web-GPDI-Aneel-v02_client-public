import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  indicadores: any;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    descricao: ['', Validators.required],
    unidadeIndicador: ['', Validators.required],
    valorIndicador: ['', Validators.required],
    valorEconomico: ['', Validators.required],
    porcentagem: ['', Validators.required]
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
