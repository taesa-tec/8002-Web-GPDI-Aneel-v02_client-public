import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  propriedade: any;
  depositantes = [
    {id: 1, nome: 'Depositante 1', porcentagem: '20'},
    {id: 2, nome: 'Depositante 2', porcentagem: '30'}
  ];

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    dataPedido: ['', Validators.required],
    numeroPedido: ['', Validators.required],
    titulo: ['', Validators.required],
    investidores : [[], Validators.required],
    depositantes: this.fb.array([], Validators.required)
  });

  depositantesControls = this.form.get('depositantes') as FormArray;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(false) {
      this.depositantes.forEach(d => {
        this.addDepositante(d);
      });
    } else {
      this.addDepositante();
    }
  }

  addDepositante(depositante?: any) {
    this.depositantesControls.push(this.fb.group({
      id: [depositante?.id || '', Validators.required],
      porcentagem: [depositante?.porcentagem || '', Validators.required]
    }));
  }

  removeDepositante(index: number) {
    if (this.form.enabled) {
      this.depositantesControls.removeAt(index);
    }
  }

  selectedDepositantes() {
    return this.depositantesControls.value.map(a => a.id);
  }

  async submit() {
    if(this.form.valid) {
      try {
        const propriedade = this.form.value;
        console.log(propriedade);
        //await this.service.salvar(propriedade);
      } catch(e) {
        console.log(e.message);
      }
    }
  }

}
