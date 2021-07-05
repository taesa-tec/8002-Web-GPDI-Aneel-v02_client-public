import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { AppService } from '@app/services';
import { FileService } from '@app/services/file.service';
import { Projeto } from '../../projeto.component';

@Component({
  selector: 'app-gerador-xml',
  templateUrl: './gerador-xml.component.html'
})
export class GeradorXmlComponent implements OnInit {

  projeto: Projeto;
  formProjetoXml = this.fb.group({
    versao: ['', Validators.required]
  });
  formAuditoriaXml = this.fb.group({
    versao: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private service: ProjetoService,
    private fb: FormBuilder,
    private file: FileService
  ) { }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();
  }

  async gerarXml(form: FormGroup, type: string) {
    if (form.invalid) {
      return;
    }
    this.app.loading.show().then();

    try {
      await this.file.urlToBlobDownload(`Projetos/${this.projeto.id}/GerarXML/${type}`, '', null, form.value);
    } catch (e) {
      console.error(e);

    }
    this.app.loading.hide();
  }

}
