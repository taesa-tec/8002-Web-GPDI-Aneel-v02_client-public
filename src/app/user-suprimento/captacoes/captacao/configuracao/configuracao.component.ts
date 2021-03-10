import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ViewContratoComponent} from '@app/user-shared/components';
import {ActivatedRoute, Router} from '@angular/router';
import {CaptacaoArquivo, CaptacaoDetalhes} from '@app/user-shared/captacao';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';
import {FileUploaded} from '@app/commons';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styles: []
})
export class ConfiguracaoComponent implements OnInit {

  contratos: Array<any>;
  fornecedores: Array<any>;
  uploads: Array<CaptacaoArquivo> = [];


  form: FormGroup = this.fb.group({
    contratoId: this.fb.control(''),
    arquivos: this.fb.control([]),
    fornecedores: this.fb.array([]),
    consideracoes: this.fb.control(''),
    termino: this.fb.control('', [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]),
  });

  arquivosControls = this.form.get('arquivos') as FormControl;
  contratosControls = this.form.get('contratos') as FormArray;
  fornecedoresControls = this.form.get('fornecedores') as FormArray;

  get captacao(): CaptacaoDetalhes {
    return this.parent?.captacao;
  }

  constructor(
    protected app: AppService,
    protected service: CaptacoesService,
    public parent: CaptacaoComponent,
    protected route: ActivatedRoute,
    protected router: Router,
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

    this.addFornecedor();
    if (this.captacao?.arquivos) {
      this.uploads = this.captacao.arquivos;
      const files = this.uploads.map(f => f.id);
      this.arquivosControls.setValue(files);
    }

  }

  getContratos(current: string) {
    const selecteds = this.contratosControls.value;
    return this.contratos.filter(item => selecteds.indexOf(item.id) === -1 || item.id === current);
  }

  abrirContrato(id: number) {

    const modalRef = this.modal.open(ViewContratoComponent, {size: 'lg'});
    modalRef.componentInstance.contratoId = id;
  }

  addFornecedor(id = '') {
    this.fornecedoresControls.push(this.fb.control(id, [Validators.required]));
  }

  removeFornecedor(index: number) {
    this.fornecedoresControls.removeAt(index);
  }

  async anexarArquivos() {
    try {
      this.uploads = await this.app.uploadForm(this.uploads.map(f => f.id), `Captacoes/${this.captacao.id}/Arquivos`);
      const files = this.uploads.map(f => f.id);
      this.arquivosControls.setValue(files);
      //this.updateFormFiles(files);
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.put(this.captacao.id, this.form.value);
        this.router.navigate(['../../']).then();
        this.app.alert('Configuração da proposta salva com sucesso').then();
      } catch (e) {
        console.error(e);
      }
    }
  }

}
