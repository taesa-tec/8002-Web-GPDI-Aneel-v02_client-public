import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService, ServiceBase} from '@app/services';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EquipePeD} from '@app/commons';
import {FormBuilder, Validators} from '@angular/forms';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-selecao',
  templateUrl: './formalizacao.component.html',
  styles: []
})
export class FormalizacaoComponent implements OnInit, OnDestroy {

  route: ActivatedRoute;
  equipe: EquipePeD;
  empresas: Array<any>;
  file: File;
  captacaoId = 0;
  aprovadoCtrl = this.fb.control('', Validators.required);
  numeroProjetoCtrl = this.fb.control('');
  tituloCompletoCtrl = this.fb.control('');
  empresaProponenteCtrl = this.fb.control('');
  inicioProjetoCtrl = this.fb.control('');
  responsavelIdCtrl = this.fb.control('');
  compartilhamentoCtrl = this.fb.control('');
  segmentoIdCtrl = this.fb.control('');
  form = this.fb.group({
    aprovado: this.aprovadoCtrl,
    responsavelId: this.responsavelIdCtrl,
    compartilhamento: this.compartilhamentoCtrl,
    numeroProjeto: this.numeroProjetoCtrl,
    tituloCompleto: this.tituloCompletoCtrl,
    empresaProponenteId: this.empresaProponenteCtrl,
    segmentoId: this.segmentoIdCtrl,
    inicioProjeto: this.inicioProjetoCtrl,
    arquivoId: ['']
  });

  protected subscription: Subscription;

  constructor(public activeModal: NgbActiveModal,
              protected app: AppService,
              protected fb: FormBuilder,
              protected service: ServiceBase<any>,
              protected fileService: FileService,
              protected cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.equipe = data.equipe;
      this.captacaoId = parseFloat(this.route.snapshot.fragment);
      this.empresas = data.empresas.filter(e => e.categoria === 1);
    });
    this.aprovadoCtrl.valueChanges.subscribe(value => {
      [this.tituloCompletoCtrl, this.empresaProponenteCtrl, this.numeroProjetoCtrl,
        this.inicioProjetoCtrl, this.responsavelIdCtrl, this.compartilhamentoCtrl].forEach(ctrl => {
        ctrl.clearValidators();
        ctrl.setValue('');
        if (value) {
          ctrl.setValidators(Validators.required);
        }
      });
      this.form.updateValueAndValidity();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async anexarArquivos(evt) {
    try {
      this.file = evt.target.files.item(0);
    } catch (e) {
      console.error(e);
    }
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    try {
      this.app.showLoading();
      const file = await this.service.upload([this.file], `${this.captacaoId}/Formalizacao/Arquivo`);
      this.form.patchValue({arquivoId: file.id});
      await this.service.post(`${this.captacaoId}/Formalizacao`, this.form.value);
      this.app.alert('Formalização salvo com sucesso!').then();
      this.activeModal.close();
    } catch (e) {
      console.error(e);
      if (e.error?.detail) {
        this.app.alertError(e.error.detail).then();
      } else {
        this.app.alertError('Não foi possível salvar a Formalização').then();
      }
    }
    this.app.hideLoading();
  }

}
