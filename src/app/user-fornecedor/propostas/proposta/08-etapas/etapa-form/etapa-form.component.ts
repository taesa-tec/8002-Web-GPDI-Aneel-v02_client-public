import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etapa-form',
  templateUrl: './etapa-form.component.html',
  styleUrls: ['./etapa-form.component.scss']
})
export class EtapaFormComponent implements OnInit {

  produtos: Array<any>;

  formEtapa: FormGroup;
  arrayProdutos = this.fb.array([]);

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.produtos = this._getProdutos();

    this.formEtapa = this.fb.group({
      descricao: ['', [Validators.required]],
      produtos: this.arrayProdutos
    });

    this.addProduto();
  }

  getProdutos(current: string) {
    const selecteds = this.arrayProdutos.value.map(i => parseInt(i));
    return this.produtos.filter(item => selecteds.indexOf(item.id) === -1 || item.id === parseInt(current));
  }

  addProduto(id?:number) {
    this.arrayProdutos.push(this.fb.control(id, Validators.required));
  }

  removeProduto(index:number) {
    this.arrayProdutos.removeAt(index);
  }

  async onSubmit() {
    if (this.formEtapa.valid) {
      const etapa = this.formEtapa.value;
      
      try {
        console.log(etapa, 'Criar');
        this.app.alert('Etapa adicionada com sucesso');
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar a etapa');
        console.error(e);
      }
    }
  }

  _getProdutos() {
    return [
      {
        id: 1,
        nome: 'Produto 1'
      },
      {
        id: 2,
        nome: 'Produto 2'
      },
      {
        id: 3,
        nome: 'Produto 3'
      }
    ]
  }

}
