import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {AppService, LoadingController, UploadFilesService} from '@app/services';
import {EditarComponent} from '@app/pages/projetos/projeto/refp/editar/editar.component';

@Component({
  selector: 'app-refp-editar-rh',
  templateUrl: './recurso-humano.component.html',
  styles: []
})
export class RecursoHumanoComponent implements OnInit {
  @Input() data: { etapas: any[]; meses: any[]; colaboradores: any[]; recursos: any[]; coexecutores: any[]; empresas: any[] };
  @Input() registro;
  @Output() formChange: EventEmitter<any> = new EventEmitter<any>();

  projeto: Projeto;
  file: File;
  valorHora = 0;
  custo: any;

  financiadorInput = '';
  recursoHumanoCtrl = this.fb.control('', [Validators.required]);
  horasCtrl = this.fb.control('', [Validators.required, Validators.min(1)]);

  financiadoraCtrl = this.fb.control('');
  coExecutorFinanciadorCtrl = this.fb.control('');

  get form() {
    return this.parent.form;
  }


  constructor(protected fb: FormBuilder,
              protected parent: EditarComponent,
              protected app: AppService,
              protected uploadService: UploadFilesService,
              protected router: Router,
              protected route: ActivatedRoute,
              protected service: ProjetoService,
              protected loading: LoadingController) {
  }

  ngOnInit(): void {
    this.service.projeto.subscribe(p => this.projeto = p);

    this.parent.form = this.fb.group({
      id: [''],
      observacaoInterna: ['', Validators.required],
      recursoHumanoId: this.recursoHumanoCtrl,
      horas: this.horasCtrl,
      atividadeRealizada: ['', Validators.required],
      comprovanteId: [''],
      //
      etapaId: ['', Validators.required],
      financiadoraId: this.financiadoraCtrl,
      coExecutorFinanciadorId: this.coExecutorFinanciadorCtrl,
      mesReferencia: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      dataDocumento: ['', Validators.required],
    }, {
      validators: form => {
        if (form.value.financiadoraId === '' && form.value.coExecutorFinanciadorId === '') {
          return {financiador: true};
        }
        return null;
      }
    });

    this.recursoHumanoCtrl.valueChanges.subscribe(id => {
      this.valorHora = this.data.colaboradores.find(_c => _c.id === parseFloat(id))?.valorHora || 0;
      this.updateCusto(this.horasCtrl.value);
    });
    this.horasCtrl.valueChanges.subscribe(value => {
      this.updateCusto(value);
    });
    this.updateCusto(this.registro.horas * this.registro.valor);
    this.registro.dataDocumento = this.registro.dataDocumento.split('T')[0];
    this.financiadorInput = this.registro.financiadoraId ? `e-${this.registro.financiadoraId}` : `c-${this.registro.coExecutorFinanciadorId}`;
    this.form.valueChanges.subscribe(e => this.formChange.emit(e));
    this.form.patchValue(this.registro);

  }

  updateFinanciador(cod: string) {
    this.financiadoraCtrl.setValue('');
    this.coExecutorFinanciadorCtrl.setValue('');
    if (cod.length > 0) {

      const [type, id] = cod.split('-');

      if (type === 'e') {
        this.financiadoraCtrl.setValue(id);
      } else {
        this.coExecutorFinanciadorCtrl.setValue(id);
      }
    }


  }

  updateCusto(value) {
    const custo = this.valorHora * parseFloat(value) || 0;
    const p = new CurrencyPipe('pt-BR', 'R$');
    this.custo = p.transform(custo);

  }

  fileChange(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this.file = files.length > 0 ? files.item(0) : null;
  }

  async submit() {
    if (this.form.invalid || this.file === null) {
      return;
    }
    try {
      this.loading.show().then();
      if (this.file) {
        const file = await this.uploadService.upload([this.file], 'File');
        this.form.patchValue({comprovanteId: file[0].id});
      }
      await this.service.post(`${this.projeto.id}/RegistroFinanceiro/RecursoHumano`, this.form.value);
      this.app.alert('Registro Salvo com sucesso!');

      this.router.navigate(['../../pendente'], {relativeTo: this.route}).then();
    } catch (e) {
      console.error(e);
      this.app.alertError('Não foi possível salvar o registro!');
    } finally {
      this.loading.hide();
    }
  }
}
