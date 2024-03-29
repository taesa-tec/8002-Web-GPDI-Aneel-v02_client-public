import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Projeto} from '../../projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {RelatorioFinal} from './../relatorio';
import {FileService} from '@app/services/file.service';
import {AppService, UploadFilesService} from '@app/services';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html'
})
export class FinalComponent implements OnInit {

  projeto: Projeto;
  relatorio: RelatorioFinal;
  relatorioArquivo: File;
  auditoriaRelatorioArquivo: File;

  form = this.fb.group({
    id: [0, Validators.required],
    isProdutoAlcancado: ['', Validators.required],
    tecnicaProduto: ['', Validators.required],
    isTecnicaImplementada: ['', Validators.required],
    tecnicaImplementada: ['', Validators.required],
    isAplicabilidadeAlcancada: ['', Validators.required],
    aplicabilidadeJustificativa: [''],
    resultadosTestes: [''],
    abrangenciaProduto: [''],
    ambitoAplicacaoProduto: [''],
    transferenciaTecnologica: ['', Validators.required],
    relatorioArquivoId: [''],
    auditoriaRelatorioArquivoId: ['']
  });

  constructor(
    private app: AppService,
    private fileService: FileService,
    private uploadService: UploadFilesService,
    private service: ProjetoService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const {relatorio} = this.route.snapshot.data;
    this.relatorio = relatorio;
    this.projeto = this.service.getCurrentProjeto();

    if (this.relatorio.id) {
      this.form.patchValue(this.relatorio);
    }

    this.changeProdutoAlcancado();
    this.changeTecnicaImplementada();
    this.changeAplicabilidadeAlcancada();
  }

  changeProdutoAlcancado() {
    this.form.get('isProdutoAlcancado').valueChanges.subscribe(status => {
      this.form.controls['tecnicaProduto'].reset();
    });
  }

  changeTecnicaImplementada() {
    this.form.get('isTecnicaImplementada').valueChanges.subscribe(status => {
      this.form.controls['tecnicaImplementada'].reset();
    });
  }

  changeAplicabilidadeAlcancada() {
    this.form.get('isAplicabilidadeAlcancada').valueChanges.subscribe(status => {
      const controls = [
        {name: 'resultadosTestes', status: true},
        {name: 'abrangenciaProduto', status: true},
        {name: 'ambitoAplicacaoProduto', status: true},
        {name: 'aplicabilidadeJustificativa', status: false}
      ];

      controls.forEach(c => {
        if (status) {
          this.form.controls[c.name].setValidators([c.status ? Validators.required : Validators.nullValidator]);
        } else {
          this.form.controls[c.name].setValidators([!c.status ? Validators.required : Validators.nullValidator]);
        }
      });

      controls.forEach(c => {
        this.form.controls[c.name].reset();
        this.form.controls[c.name].updateValueAndValidity();
      });
    });
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    const _file = files.length > 0 ? files.item(0) : null;
    if (_file.name.toLowerCase().endsWith('.pdf')) {
      this[file] = _file;
    } else {
      this.app.alert('Somentes arquivos pdf');
    }
  }

  deleteFile(file: string) {
    this.relatorio[file] = null;
  }

  async downloadFile(file: string) {
    await this.fileService.urlToBlobDownload(`Projetos/${this.projeto.id}/Relatorio/RelatorioFinal/Arquivos/${file}`, null);
  }

  validate() {
    return (this.form.valid &&
      (this.relatorio?.relatorioArquivoId || this.relatorioArquivo) &&
      (this.relatorio?.auditoriaRelatorioArquivoId || this.auditoriaRelatorioArquivo));
  }

  async submit() {
    try {
      if (this.validate()) {
        const path = `${this.projeto.id}/Relatorio/RelatorioFinal`;

        if (this.relatorioArquivo) {
          const file = await this.uploadService.upload([this.relatorioArquivo], 'File');
          this.form.patchValue({relatorioArquivoId: file[0].id});
        }

        if (this.auditoriaRelatorioArquivo) {
          const file = await this.uploadService.upload([this.auditoriaRelatorioArquivo], 'File');
          this.form.patchValue({auditoriaRelatorioArquivoId: file[0].id});
        }

        this.relatorio = await this.service.post(path, this.form.value);
        this.app.alert('Relatório salvo com sucesso.').then();
      }
    } catch (e) {
      this.app.alertError('Não foi possível salvar o relatório final').then();
      console.error(e);
    }
  }

}
