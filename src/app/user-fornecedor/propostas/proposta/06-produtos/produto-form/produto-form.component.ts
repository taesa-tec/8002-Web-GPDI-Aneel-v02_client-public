import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  produto: any;
  status: boolean = false;

  formProduto: FormGroup;
  arrayProduto = this.fb.array([]);

  // DADOS DE TESTE
  tipoProdutos = [
    {nome: 'Produto 1'},
    {nome: 'Produto 2'},
    {nome: 'Produto 3'}
  ]; 

  cadeiaInovacoes = [
    {nome: 'Fase 1'},
    {nome: 'Fase 2'},
    {nome: 'Fase 3'}
  ];

  tipoProdutosDetalhados = [
    {nome: 'Produto Detalhado 1'},
    {nome: 'Produto Detalhado 2'},
    {nome: 'Produto Detalhado 3'}
  ];
  
  especificacoes = [
    {id: 1, tipo: 'Tipo'},
    {id: 2, tipo: 'Tipo 2'},
    {id: 3, tipo: 'Tipo 3'},
    {id: 4, tipo: 'Tipo 4'},
  ];

  //------------------------

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formProduto = this.fb.group({
      // classificacao: ['', [Validators.required]],
      tipoProduto: ['', [Validators.required]],
      cadeiaInovacao: ['', [Validators.required]],
      tipoProdutoDetalhado: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      especificacoes: this.arrayProduto
    });

    if(this.produto){
      this.formProduto.patchValue(this.produto);
      this.status = true;
    }

  }

  async onSubmit() {
    if (this.formProduto.valid) {
      const produto = this.formProduto.value;
      
      try {
        if (this.produto) {
          console.log(produto, 'Editar');
          this.app.alert('Produto editado com sucesso');
        } else {
          console.log(produto, 'Criar');
          this.app.alert('Produto adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o produto');
        console.error(e);
      }
    }
  }

}
