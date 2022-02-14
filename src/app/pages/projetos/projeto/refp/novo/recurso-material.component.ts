import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {CurrencyPipe} from '@angular/common';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {AppService, LoadingController, UploadFilesService} from '@app/services';
import {AppValidators} from '@app/commons';

@Component({
  selector: 'app-recurso-material',
  templateUrl: './recurso-material.component.html',
  styles: []
})
export class RecursoMaterialComponent implements OnInit {

  projeto: Projeto;
  file: File;
  valorItem = 0;
  custo: any;
  data: { etapas: any[], meses: any[], colaboradores: any[], recursos: any[], coexecutores: any[], empresas: any[], categorias: any[] };

  recursoMaterialCtrl = this.fb.control('', [Validators.required]);
  quantidadeCtrl = this.fb.control('', [Validators.required, Validators.min(1)]);
  valorCtrl = this.fb.control('', [Validators.required]);

  form = this.fb.group({
    nomeItem: ['', Validators.required],
    etapaId: ['', Validators.required],
    recursoMaterialId: this.recursoMaterialCtrl,
    quantidade: this.quantidadeCtrl,
    valor: this.valorCtrl,
    recebedoraId: ['', Validators.required],
    financiadoraId: ['', Validators.required],

    mesReferencia: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', Validators.required],
    dataDocumento: ['', Validators.required],
    beneficiado: ['', Validators.required],
    cnpjBeneficiado: ['', [Validators.required, AppValidators.cnpj]],
    categoriaContabilId: ['', Validators.required],
    equipaLaboratorioExistente: ['', Validators.required],
    equipaLaboratorioNovo: ['', Validators.required],
    isNacional: ['', Validators.required],
    funcaoEtapa: ['', Validators.required],
    comprovanteId: [''],
    observacaoInterna: [''],
    especificaoTecnica: ['', Validators.required],
  }, {
    validators: form => {
      if (form.value.financiadoraId === '' && form.value.coExecutorFinanciadorId === '') {
        return {financiador: true};
      }
      return null;
    }
  });

  constructor(protected fb: FormBuilder, protected route: ActivatedRoute,
              protected app: AppService,
              protected router: Router,
              protected uploadService: UploadFilesService,
              protected service: ProjetoService,
              protected loading: LoadingController) {
  }

  ngOnInit(): void {

    this.service.projeto.subscribe(p => this.projeto = p);
    this.route.data.subscribe(data => {
      this.data = data.items;
    });

    this.valorCtrl.valueChanges.subscribe(id => {
      this.updateCusto();
    });
    this.quantidadeCtrl.valueChanges.subscribe(value => {
      this.updateCusto();
    });
    this.updateCusto();
  }

  updateCusto() {
    const p = new CurrencyPipe('pt-BR', 'R$');
    const custo = parseFloat(this.valorCtrl.value) || 0;
    const qtd = parseFloat(this.quantidadeCtrl.value) || 0;
    this.custo = p.transform(custo * qtd);

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
      const file = await this.uploadService.upload([this.file], 'File');
      this.form.patchValue({comprovanteId: file[0].id});
      await this.service.post(`${this.projeto.id}/RegistroFinanceiro/RecursoMaterial`, this.form.value);
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
