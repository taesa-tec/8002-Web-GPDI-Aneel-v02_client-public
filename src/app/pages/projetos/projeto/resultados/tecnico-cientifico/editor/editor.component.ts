import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  cientifico: any;
  paises: Array<{ id: number; nome: string }>;
  file: File;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    dataPublicacao: ['', Validators.required],
    confirmacao: ['', Validators.required],
    nome: ['', Validators.required],
    endereco: ['', Validators.required],
    pais: ['', Validators.required],
    cidade: ['', Validators.required],
    titulo: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  validate() {
    return (this.form.valid && this.file);
  }

  async submit() {
    if(this.validate()) {
      try {
        const cientifico = this.form.value;
        //await this.service.salvar(relatorio);
      } catch(e) {
        console.log(e.message);
      }
    }
  }

}
