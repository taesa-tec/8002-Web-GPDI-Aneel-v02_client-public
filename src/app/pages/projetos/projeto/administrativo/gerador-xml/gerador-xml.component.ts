import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
  formXml = this.fb.group({
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

  async gerarXml() {
    if (this.formXml.invalid) {
      return;
    }
    this.app.loading.show().then();

    try {
      await this.file.urlToBlobDownload(`Projetos/${this.projeto.id}/GerarXML/FinalProjeto`, '', null, this.formXml.value);
    } catch (e) {
      console.error(e);

    }
    this.app.loading.hide();
  }

}
