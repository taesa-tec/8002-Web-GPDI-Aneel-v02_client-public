import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {AppValidators, Funcoes, Graduacoes} from '@app/commons';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {AppService} from '@app/services';


@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styles: []
})
export class RecursosHumanosComponent implements OnInit {
  tableCols: TableComponentCols = [
    {
      field: 'nomeCompleto',
      title: 'Nome Completo',
      order: true,
    },
    {
      field: 'empresa',
      title: 'Empresa',
      order: true,
    },
    {
      field: 'funcao',
      title: 'Função',
      value: rh => Funcoes.find(g => g.value === rh.funcao)?.text,
      order: true,
    },
    {
      field: 'titulacao',
      title: 'Titulação',
      value: rh => Graduacoes.find(g => g.value === rh.titulacao)?.text,
      order: true,
    }
  ];
  buttons = [
    {
      isLink: true,
      action: './#${id}',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];
  recursos = [];
  empresas = [];
  coExecutores = [];

  empresaCtrl = this.fb.control('', Validators.required);
  form = this.fb.group({
    id: [0],
    empresa: this.empresaCtrl,
    empresaId: [''],
    coExecutorId: [''],
    nomeCompleto: ['', [Validators.required]],
    titulacao: ['', [Validators.required]],
    funcao: ['', [Validators.required]],
    nacionalidade: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    valorHora: ['', [Validators.required]],
    urlCurriculo: ['', [AppValidators.isUrl]],
  });
  documentoMask = '';
  titulacoes = Graduacoes;
  funcoes = Funcoes;
  protected activeModal: NgbModalRef;


  @ViewChild('formRef') formRef: TemplateRef<any>;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected fb: FormBuilder,
              protected modal: NgbModal,
              protected cdr: ChangeDetectorRef,
              protected service: ProjetoService,
              protected app: AppService) {
  }

  ngOnInit(): void {
    this.formSetup();
    this.route.fragment.subscribe(f => {
      if (f === 'novo') {
        this.openForm().then();
      }
    });
    this.route.data.subscribe(data => {
      this.recursos = data.recursos;
      const {coExecutores, empresas} = data.empresas;
      this.empresas = empresas;
      this.coExecutores = coExecutores;
      if (data.recurso) {
        this.form.patchValue(data.recurso);
        this.updateEmpresa(data.recurso);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
        this.openForm().then();
      } else {
        this.form.reset({
          id: 0,
          empresa: '',
          empresaId: '',
          coExecutorId: '',
          nomeCompleto: '',
          titulacao: '',
          funcao: '',
          nacionalidade: '',
          documento: '',
          valorHora: '',
          urlCurriculo: ''
        });
      }

    });
  }

  async openForm() {
    this.activeModal = this.modal.open(this.formRef, {size: 'lg'});
    try {
      await this.activeModal.result;
    } catch (e) {
      console.error(e);
    }
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

  formSetup() {
    this.empresaCtrl.valueChanges.subscribe(e => {
      this.form.get('empresaId').setValue('');
      this.form.get('coExecutorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaId' : 'coExecutorId');
      ctrl.setValue(id);
    });
    this.form.get('nacionalidade').valueChanges.subscribe(v => {
      const brasileiro = v === 'Brasileiro';
      const control = this.form.get('documento');
      control.clearValidators();

      this.documentoMask = brasileiro ? '000.000.000-00' : 'A*';
      if (brasileiro) {
        control.setValidators([Validators.required, AppValidators.cpf]);
      } else {
        control.setValidators([Validators.required]);
      }

    });
  }

  updateEmpresa(value) {
    if (value.empresaId) {
      this.form.get('empresa').setValue(`e-${value.empresaId}`);
    } else if (value.coExecutorId) {
      this.form.get('empresa').setValue(`c-${value.coExecutorId}`);
    }
  }

  async remover(id) {
    if (!await this.app.confirm('Tem certeza que deseja remover esse registro?')) {
      return;
    }
    const projeto = this.service.getCurrentProjeto();
    this.app.loading.show().then();
    try {
      await this.service.delete(`${projeto.id}/Recursos/Humanos/${id}`);
      this.activeModal.close();
    } catch (e) {
      console.log(e);
      if (e.error && e.error.detail) {
        this.app.alertError(e.error.detail).then();
      } else {
        this.app.alertError('Não foi possível excluir o recurso!').then();
      }
    }
    this.app.loading.hide();

  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.app.loading.show().then();
    const projeto = this.service.getCurrentProjeto();
    const url = `${projeto.id}/Recursos/Humanos`;

    try {

      if (this.form.value.id === 0) {
        await this.service.post(url, this.form.value);
      } else {
        await this.service.put(url, this.form.value);
      }
      this.app.alert('Salvo com sucesso!').then();
      this.activeModal.close();
    } catch (e) {
      console.error(e);
      this.app.alertError('Não foi possível salvar o recurso, tente novamente mas tarde').then();
    }
    this.app.loading.hide();
  }

}
