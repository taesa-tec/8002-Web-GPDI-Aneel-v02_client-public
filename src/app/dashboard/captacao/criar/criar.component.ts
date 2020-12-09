import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import {AppService} from '@app/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ServiceBase} from '@app/services/service-base.service';
import {FornecedoresService} from '@app/services/configuracoes-sistema/fornecedores.service';
import {ContratosService} from '@app/services/configuracoes-sistema/contratos.service';

@Component({
  selector: 'app-criar-captacao',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})
export class CriarComponent implements OnInit {


  projeto: any;
  fornecedores: Array<{ id: number; responsavelNome: string }> = [];
  contratos: Array<{ id: number; titulo: string }> = [];
  fornecedoresFormArray: FormArray = new FormArray([]);
  form: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    fornecedores: this.fornecedoresFormArray,
    observacoes: [''],
  });


  get id(): number {
    return this.form.get('id').value;
  }

  set id(value: number) {
    this.form.get('id').setValue(value);
  }


  constructor(
    protected app: AppService,
    protected service: ServiceBase<any>,
    protected fornecedorService: FornecedoresService,
    protected contratosService: ContratosService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  async ngOnInit() {
    this.fornecedores = await this.fornecedorService.obter();
    this.contratos = await this.contratosService.obter();
    this.fornecedoresFormArray = this.form.get('fornecedores') as FormArray;
    console.log(this.fornecedores);
  }

  adicionarFornecedor(id = '') {
    this.fornecedoresFormArray.push(this.fb.control(''));
  }

  async onSubmit() {
    if (this.form.valid) {
      const projeto: any = this.form.value;

      try {
        //await this.app.captacao.criarCaptacao(projeto);
        this.app.alert('Captação criada com sucesso!', 'Sucesso').then();
        this.activeModal.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
