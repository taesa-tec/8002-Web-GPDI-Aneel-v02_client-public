import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {CurrencyPipe} from '@angular/common';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {LoadingController} from '@app/services';
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

  financiadoraCtrl = this.fb.control('');
  coExecutorFinanciadorCtrl = this.fb.control('');

  recebedoraCtrl = this.fb.control('');
  coExecutorRecebedorCtrl = this.fb.control('');

  form = this.fb.group({
    nomeItem: ['', Validators.required],
    etapaId: ['', Validators.required],
    recursoMaterialId: this.recursoMaterialCtrl,
    quantidade: this.quantidadeCtrl,
    valor: this.valorCtrl,
    recebedoraId: this.recebedoraCtrl,
    financiadoraId: this.financiadoraCtrl,

    coExecutorFinanciadorId: this.coExecutorFinanciadorCtrl,
    coExecutorRecebedorId: this.coExecutorRecebedorCtrl,
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
    observacaoInterna: ['', Validators.required],
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
              protected router: Router,
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

  updateRecebedor(cod: string) {
    this.recebedoraCtrl.setValue('');
    this.coExecutorRecebedorCtrl.setValue('');
    if (cod.length > 0) {
      const [type, id] = cod.split('-');

      if (type === 'e') {
        this.recebedoraCtrl.setValue(id);
      } else {
        this.coExecutorRecebedorCtrl.setValue(id);
      }
    }


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
      const registro = await this.service.post(`${this.projeto.id}/RegistroFinanceiro/RecursoMaterial`, this.form.value);
      await this.service.upload([this.file], `${this.projeto.id}/RegistroFinanceiro/${registro.id}/Comprovante`);
      this.router.navigate(['../../pendente'], {relativeTo: this.route}).then();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.hide();
    }
  }

}
