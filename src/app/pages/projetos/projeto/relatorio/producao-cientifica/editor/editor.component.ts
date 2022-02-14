import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {ProducaoCientifica} from '../../relatorio';
import {AppService, UploadFilesService} from '@app/services';
import {FileService} from '@app/services/file.service';
import * as moment from 'moment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  producao: ProducaoCientifica;
  paises: Array<{ id: number; nome: string }>;
  file: File;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    dataPublicacao: ['', Validators.required],
    confirmacaoPublicacao: ['', Validators.required],
    nomeEventoPublicacao: ['', Validators.required],
    linkPublicacao: ['', Validators.required],
    paisId: ['', Validators.required],
    cidade: ['', Validators.required],
    tituloTrabalho: ['', Validators.required],
    arquivoTrabalhoOrigemId: ['']
  });

  constructor(
    private app: AppService,
    private uploadService: UploadFilesService,
    private fileService: FileService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();
    if (this.producao) {
      this.form.patchValue({
        ...this.producao,
        dataPublicacao: moment(this.producao.dataPublicacao).format('yyyy-MM-DD')
      });
    }
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  deleteFile() {
    this.producao.arquivoTrabalhoOrigemId = null;
  }

  async downloadFile() {
    await this.fileService.urlToBlobDownload(`Projetos/${this.projeto.id}/Relatorio/ProducaoCientifica/${this.producao.id}/Arquivos/Origem`, null);
  }

  validate() {
    return (this.form.valid && (this.producao?.arquivoTrabalhoOrigemId || this.file));
  }

  async delete() {
    try {
      if (this.validate()) {
        if (await this.app.confirm('Tem certeza que deseja excluir esta produção científica?')) {
          await this.service.delete(`${this.projeto.id}/Relatorio/ProducaoCientifica/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async submit() {
    try {
      if (this.validate()) {
        const path = `${this.projeto.id}/Relatorio/ProducaoCientifica`;

        if (this.file) {
          const file = await this.uploadService.upload([this.file], 'File');
          this.form.patchValue({arquivoTrabalhoOrigemId: file[0].id});
        }
        
        const producao = this.form.value;

        if (producao.id) {
          await this.service.put(path, producao);
        } else {
          await this.service.post(path, producao);
        }
        this.app.alert('Registro salvo com sucesso!');
        this.activeModal.close();
      }
    } catch (e) {
      console.error(e);
      this.app.alertError('Erro ao salvar o registro');
    }
  }

}
