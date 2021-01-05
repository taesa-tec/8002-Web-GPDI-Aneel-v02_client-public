import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ViewContratoComponent} from '@app/user-shared/components';
import {ActivatedRoute} from '@angular/router';
import {CaptacaoDetalhes} from '@app/user-shared/captacao';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styles: []
})
export class ConfiguracaoComponent implements OnInit {

  contratos: Array<any>;
  fornecedores: Array<any>;
  uploads: Array<File> = [];


  form: FormGroup = this.fb.group({
    contratos: this.fb.array([]),
    arquivos: this.fb.array([]),
    fornecedores: this.fb.array([]),
    consideracoes: this.fb.control(''),
    termino: this.fb.control('', [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]),
  });

  arquivosControls = this.form.get('arquivos') as FormArray;
  contratosControls = this.form.get('contratos') as FormArray;
  fornecedoresControls = this.form.get('fornecedores') as FormArray;

  get captacao(): CaptacaoDetalhes {
    return this.parent?.captacao;
  }

  get arquivos() {
    return (this.arquivosControls.value as Array<any>).map(a => this.captacao.arquivos.find(ar => ar.id === a));
  }

  constructor(
    protected app: AppService,
    protected service: CaptacoesService,
    public parent: CaptacaoComponent,
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private modal: NgbModal
  ) {
  }

// @todo Verificar se há a possibilidade de haver somente um fonecedor e permitir o cadastro
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.fornecedores = data.fornecedores;
      this.contratos = data.contratos;
    });

    this.addContrato();
    this.addFornecedor();
    if (this.captacao?.arquivos) {
      this.captacao.arquivos.forEach(arquivo => {
        this.arquivosControls.push(this.fb.control(arquivo.id));
      });

    }
  }

  async configForm() {
    //this.contratos = await this.app.fornecedores.getContratos();
    //this.fornecedores = await this.app.fornecedores.getFornecedores();
    this.addContrato();
    this.addFornecedor();
  }

  getContratos(current: string) {
    const selecteds = this.contratosControls.value;
    return this.contratos.filter(item => selecteds.indexOf(item.id) === -1 || item.id === current);
  }

  abrirContrato(id: number) {

    const modalRef = this.modal.open(ViewContratoComponent, {size: 'lg'});
    modalRef.componentInstance.contratoId = id;
  }

  addContrato(id = '') {
    this.contratosControls.push(this.fb.control(id, [Validators.required]));
  }

  removeContrato(index: number) {
    this.contratosControls.removeAt(index);
  }

  addFornecedor(id = '') {
    this.fornecedoresControls.push(this.fb.control(id, [Validators.required]));
  }

  removeFornecedor(index: number) {
    this.fornecedoresControls.removeAt(index);
  }

  changeFile(e) {
    this.uploads.push(e.target.files.item(0));
  }

  deletarArquivo(idx) {
    console.log(idx);

    this.arquivosControls.removeAt(idx);
    // this.uploads.splice(index, 1);
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.put(this.captacao.id, this.form.value);
        this.app.alert('Configuração da proposta salva com sucesso').then();
      } catch (e) {

      }
    }
  }

}
