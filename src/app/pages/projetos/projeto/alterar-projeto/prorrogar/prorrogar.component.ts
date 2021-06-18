import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {AppValidators} from '@app/commons';
import {AppService} from '@app/services';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-prorrogar',
  templateUrl: './prorrogar.component.html',
  styles: []
})
export class ProrrogarComponent implements OnInit {

  projeto: Projeto;
  produtos: Array<any>;
  form = this.fb.group({
    data: ['', [Validators.required]],
    descricao: ['', Validators.required],
    produtoId: ['', Validators.required],
  });

  formXml = this.fb.group({
    versao: ['', Validators.required]
  });

  constructor(protected route: ActivatedRoute,
              protected fb: FormBuilder,
              protected service: ProjetoService,
              protected file: FileService,
              protected app: AppService) {
  }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();
    const dataCtrl = this.form.get('data');
    dataCtrl.setValidators([Validators.required, AppValidators.minDate(this.projeto.dataFinalProjeto)]);
    this.route.data.subscribe(data => {
      this.produtos = data.produtos.filter(p => p.classificacao === 'Intermediario');
    });
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    this.app.loading.show().then();
    try {
      await this.service.prorrogar(this.projeto.id, this.form.value);
      this.app.alert('Projeto Prorrogado com sucesso').then();
      this.projeto.dataFinalProjeto = this.form.value.data;
      this.service.setProjeto(this.projeto);
      this.form.reset();

    } catch (e) {
      console.error(e);
      this.app.alertError('Erro ao prorrogar o projeto, tente novamente mais tarde').then();
    }
    this.app.loading.hide();
  }

  async gerarXml() {
    if (this.formXml.invalid) {
      return;
    }
    this.app.loading.show().then();

    try {
      await this.file.urlToBlobDownload(`Projetos/${this.projeto.id}/GerarXML/Prorrogacao`, '', null, this.formXml.value);
    } catch (e) {
      console.error(e);

    }
    this.app.loading.hide();

  }

}
