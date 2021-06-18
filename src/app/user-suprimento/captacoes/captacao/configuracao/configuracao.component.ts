import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ViewContratoComponent} from '@app/components';
import {ActivatedRoute, Router} from '@angular/router';
import {CaptacaoArquivo, CaptacaoDetalhes} from '@app/captacao';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';
import {LoadingComponent} from '@app/core/components';
import {ROOT_URL} from '@app/commons';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styles: []
})
export class ConfiguracaoComponent implements OnInit {

  set isLoading(value) {
    value ? this.loading.show() : this.loading.hide();
  }

  @ViewChild(LoadingComponent) loading: LoadingComponent;
  dataMaximaExt: any = '';
  dataMinimaExt: any = '';
  contratos: Array<any>;
  fornecedores: Array<any>;
  uploads: Array<CaptacaoArquivo> = [];


  form: FormGroup = this.fb.group({
    contratoId: this.fb.control(''),
    arquivos: this.fb.control([]),
    fornecedores: this.fb.array([], [Validators.required]),
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
    @Inject(ROOT_URL) protected root_url: string,
    protected service: CaptacoesService,
    protected fileService: FileService,
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


    if (this.captacao.termino != null) {
      const capData = new Date(this.captacao.termino);
      this.dataMaximaExt = this.captacao.termino.replace(/T.+$/, '');
      this.captacao.termino = this.dataMaximaExt;
      const timeMinExt = Math.max(capData.getTime(), Date.now());
      this.dataMinimaExt = (new Date(timeMinExt)).toJSON().replace(/T.+$/, '');
    } else {
      this.dataMinimaExt = (new Date()).toJSON().replace(/T.+$/, '');

    }
    this.form.patchValue(this.captacao);
    if (this.captacao?.arquivos) {
      this.uploads = this.captacao.arquivos;
      const files = this.uploads.map(f => f.id);
      this.arquivosControls.setValue(files);
    }
    if (this.captacao?.fornecedoresConvidados) {
      this.captacao.fornecedoresConvidados.forEach(f => {
        this.addFornecedor(f.id.toString());
      });
    }

    if (this.captacao.status !== 'Elaboracao') {
      this.form.disable();
    }
    if (this.parent.captacao.fornecedoresConvidados.length === 0) {
      this.parent.captacao.fornecedoresSugeridos.forEach(f => this.addFornecedor(f.id));
    } else if (this.fornecedoresControls.length === 0) {
      this.addFornecedor();
    }
    if (this.parent.captacao.contratoId === null) {
      this.form.get('contratoId').setValue(this.parent.captacao.contratoSugeridoId);
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

  addFornecedor(id: any = '') {
    this.fornecedoresControls.push(this.fb.control(id, [Validators.required]));
  }

  removeFornecedor(index: number) {
    if (this.form.enabled) {
      this.fornecedoresControls.removeAt(index);
    }
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

  async download(arquivo: CaptacaoArquivo) {
    await this.fileService.urlToBlobDownload(arquivo.uri, arquivo.fileName);
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
        await this.service.put(this.captacao.id, this.form.value);
        this.router.navigate(['../../']).then();
        this.app.alert('Configuração da proposta salva com sucesso').then();
      } catch (e) {
        this.alertError(e, 'Não foi possível configurar');

      }
      this.isLoading = false;
    }
  }

  async estenderData() {
    this.isLoading = true;
    const prev = this.form.get('termino').value;
    try {
      await this.service.estenderCaptacao(this.captacao.id, this.dataMaximaExt);
      this.form.get('termino').setValue(this.dataMaximaExt);
      this.dataMinimaExt = this.dataMaximaExt;
      this.app.alert('Data alterada com sucesso!').then();
    } catch (e) {
      this.alertError(e, 'Não foi possível configurar');
      this.form.get('termino').setValue(prev);
      this.dataMaximaExt = prev;
      this.form.updateValueAndValidity();

    }
    this.isLoading = false;
  }

  async cancelarCaptacao() {
    const btnOptions = [
      {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
      {text: 'Confirmar Encerramento', value: true, cssClass: 'btn-danger', checkMessage: 'Confirmo que estaremos encerrando esta captação'}
    ];

    if (await this.app.confirm('Esta ação é irreversível. Todos os fornecedores convidados irão receber um email ' +
      'avisando deste encerramento. Confirmar encerramento?', 'TEM CERTEZA QUE DESEJA ENCERRAR ESTA CAPTAÇÃO?', btnOptions)) {
      this.isLoading = true;
      try {
        await this.service.cancelarCaptacao(this.captacao.id);
        this.router.navigate([this.root_url]).then();
      } catch (e) {
        this.alertError(e, 'Erro ao cancelar!');
      }
      this.isLoading = false;
    }
  }

  protected alertError(e, msgDefault = 'Ocorreu um erro, tente novamente mais tarde') {
    console.error(e);
    if (e.error?.detail) {
      this.app.alertError(e.error.detail).then();
    } else {
      this.app.alertError(msgDefault).then();

    }
  }

}
